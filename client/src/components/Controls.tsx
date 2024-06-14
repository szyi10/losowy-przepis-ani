import { useState } from "react"
import reciepes from "../../../server/recipes.json"

const Controls = () => {
  const [randomRecipe, setRandomRecipe] = useState("")

  const transformUrlToTitle = (url: string) => {
    const parts = url.split("/")
    const recipePart = parts[parts.length - 1]
    const recipeName = recipePart.replace(/-/g, " ")

    return recipeName.charAt(0).toUpperCase() + recipeName.slice(1)
  }

  const randomizeRecipe = () => {
    const randomIndex = Math.floor(Math.random() * reciepes.length)
    setRandomRecipe(reciepes[randomIndex])
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(randomRecipe)
  }

  return (
    <section className="mt-6 flex flex-col items-center w-full max-w-[450px]">
      {randomRecipe !== "" && (
        <>
          <p className="font-medium text-center">
            {transformUrlToTitle(randomRecipe)}
          </p>
          <div className="relative flex w-full border border-slate-200 py-2 px-5 rounded-md">
            <a
              href={randomRecipe}
              className="underline underline-offset-2 truncate mr-5 text-slate-500"
            >
              {randomRecipe}
            </a>
            <button onClick={copyToClipboard} className="absolute right-3">
              <img src="/copy.svg" width={24} height={24} />
            </button>
          </div>
        </>
      )}

      <button
        onClick={randomizeRecipe}
        className="bg-green-500 text-neutral-950 py-2 px-5 rounded-md transition-colors hover:bg-green-600 mt-2 w-full xs:w-auto"
      >
        Losuj przepis
      </button>
    </section>
  )
}

export default Controls
