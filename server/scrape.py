import aiohttp
import asyncio
from bs4 import BeautifulSoup
import json

base_url = "https://aniagotuje.pl"
recipe_pattern = "/przepis/"


async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()


async def get_recipes():
    recipe_links = set()
    visited_links = set()
    links_to_visit = [base_url]

    async with aiohttp.ClientSession() as session:
        while links_to_visit:
            url = links_to_visit.pop()
            if url in visited_links:
                continue

            visited_links.add(url)
            html = await fetch(session, url)
            soup = BeautifulSoup(html, "html.parser")

            new_links = [
                a["href"]
                for a in soup.find_all("a", href=True)
                if a["href"].startswith(base_url + recipe_pattern)
            ]

            for link in new_links:
                if link not in visited_links:
                    recipe_links.add(link)
                    links_to_visit.append(link)

    return list(recipe_links)


async def main():
    recipes = await get_recipes()
    with open("recipes.json", "w") as f:
        json.dump(recipes, f, indent=2)
    print(f"Found {len(recipes)} recipes.")


if __name__ == "__main__":
    asyncio.run(main())
