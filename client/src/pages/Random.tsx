import { useState } from "react"
import GlobalStyle from "../components/GlobalStyle"
import { RecipeCard } from "../components/feature"
import { Recipe } from "../types"
import { getRandomRecipe } from "../lib/api"

const Random = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  const getRecipe = () => {
    getRandomRecipe().then((data) => setRecipe(data))
  }

  return (
    <GlobalStyle>
      <div className="max-container h-screen flex items-center justify-center flex-col">
        <RecipeCard recipe={recipe} />
        <button
          onClick={getRecipe}
          className="bg-green-500 text-neutral-950 py-2 px-5 rounded-md transition-colors hover:bg-green-600 mt-2 w-full xs:w-auto"
        >
          Losuj przepis
        </button>
      </div>
    </GlobalStyle>
  )
}

export default Random
