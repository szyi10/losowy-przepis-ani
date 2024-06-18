import { useEffect, useState } from "react"
import { getDailyRecipe } from "../../../lib/api"
import GlobalStyle from "../../GlobalStyle"
import { Recipe } from "../../../types"

const DailyRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    getDailyRecipe()
      .then((data) => setRecipe(data))
      .catch(() => console.log("Failed to fetch daily recipe."))
  }, [])

  if (!recipe) {
    return (
      <GlobalStyle>
        <p>Gotowanie...</p>
      </GlobalStyle>
    )
  }

  const transformedTitle = recipe.title.split(" | ")[0]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recipe.url)
  }

  return (
    <div className="max-w-96">
      <h3 className="font-medium text-green-600 mb-3">{transformedTitle}</h3>
      <img
        src={recipe.image_url}
        alt={transformedTitle}
        className="rounded-md mb-3 shadow"
      />
      <div className="relative flex w-full border border-slate-200 py-2 px-5 rounded-md">
        <a
          href={recipe.url}
          className="underline underline-offset-2 truncate mr-5 text-slate-500"
        >
          {recipe.url}
        </a>
        <button onClick={copyToClipboard} className="absolute right-3">
          <img src="/copy.svg" width={24} height={24} />
        </button>
      </div>
    </div>
  )
}

export default DailyRecipe
