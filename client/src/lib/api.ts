import axios from "axios"
import { Recipe } from "../types"

const API_URL = "https://losowy-przepis-ani.onrender.com/"

export const getRandomRecipe = async (): Promise<Recipe | null> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${API_URL}/recipes`,
    })

    if (res.status === 200) {
      const randomIndex = Math.floor(Math.random() * res.data.length)
      return res.data[randomIndex]
    } else {
      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
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
