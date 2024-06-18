import requests
from bs4 import BeautifulSoup
import json

base_url = "https://aniagotuje.pl"
recipe_pattern = "/przepis/"


def fetch_html(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        return None


def get_recipe_urls():
    recipe_urls = set()
    visited_urls = set()
    links_to_visit = [base_url]

    while links_to_visit:
        url = links_to_visit.pop()
        if url in visited_urls:
            continue

        visited_urls.add(url)
        html = fetch_html(url)
        if not html:
            continue

        soup = BeautifulSoup(html, "html.parser")
        new_links = [
            a["href"]
            for a in soup.find_all("a", href=True)
            if a["href"].startswith(base_url + recipe_pattern)
        ]

        for link in new_links:
            if link not in visited_urls:
                recipe_urls.add(link)
                links_to_visit.append(link)

    return list(recipe_urls)


def extract_recipe_details(url):
    html = fetch_html(url)
    if not html:
        return None

    soup = BeautifulSoup(html, "html.parser")

    # Extract title
    title = soup.find("title").get_text() if soup.find("title") else "No Title"

    # Extract image URL from meta tag with itemprop="image" within <body>
    body = soup.find("body")
    if body:
        meta_image_body = body.find("meta", itemprop="image")
        image_url_body = meta_image_body["content"] if meta_image_body else "No Image"
    else:
        image_url_body = "No Image"

    # Extract image URL from meta tag with property="og:image" within <head>
    head = soup.find("head")
    if head:
        meta_image_head = head.find("meta", property="og:image")
        image_url_head = meta_image_head["content"] if meta_image_head else "No Image"
    else:
        image_url_head = "No Image"

    # Choose the image URL from body or head, prioritize body if available
    image_url = image_url_body if image_url_body != "No Image" else image_url_head

    return {"title": title, "url": url, "image_url": image_url}


def main():
    recipe_urls = get_recipe_urls()
    recipe_details = []

    for url in recipe_urls:
        recipe_detail = extract_recipe_details(url)
        if recipe_detail:
            recipe_details.append(recipe_detail)

    with open("recipes.json", "w") as f:
        json.dump(recipe_details, f, indent=2)
    print(f"Found {len(recipe_details)} recipes.")


if __name__ == "__main__":
    main()
