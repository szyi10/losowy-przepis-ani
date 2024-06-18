import { Recipe } from "../../../types"

const RecipeCard = ({ recipe }: { recipe: Recipe | null }) => {
  if (!recipe) {
    return <h3 className="text-xl font-bold">Losouj przepis Ani Gotuje</h3>
  }

  const transformedTitle = recipe.title.split(" | ")[0]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recipe.url)
  }

  return (
    <div className="max-w-96">
      <h3 className="font-medium text-center">{transformedTitle}</h3>
      <img
        src={recipe.image_url}
        alt={transformedTitle}
        className="rounded-md mt-1 mb-3"
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

export default RecipeCard
