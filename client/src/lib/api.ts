import axios from "axios"
import { Recipe } from "../types"
import recipes from "./recipes.json"

const API_URL = "https://losowy-przepis-ani.onrender.com"

export const getRandomRecipe = async (): Promise<Recipe | null> => {
  const randomIndex = Math.floor(Math.random() * recipes.length)
  return recipes[randomIndex]
}

export const getDailyRecipe = async (): Promise<Recipe | null> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${API_URL}/random_recipe`,
    })

    if (res.status === 200) {
      return res.data
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
