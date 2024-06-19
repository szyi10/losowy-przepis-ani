/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const fetch = require("node-fetch")

const updateRecipe = async () => {
  const url = "https://losowy-przepis-ani.onrender.com"

  try {
    const res = await fetch(url, {
      method: "POST",
    })

    if (!res.ok) {
      throw new Error(`HTTP error! Status ${res.status}`)
    }
  } catch (error) {
    console.log("Error updating recipe:", error.message)
  }
}

module.exports = updateRecipe
