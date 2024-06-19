const express = require("express")
const cron = require("node-cron")
const fs = require("fs")

const app = express()
const PORT = process.env.PORT || 3000

let selectedRecipe = {}

// Load recipes from JSON file
const loadRecipes = () => {
  const data = fs.readFileSync("recipes.json")
  return JSON.parse(data)
}

// Pick random recipe
const pickRandomRecipe = () => {
  const recipes = loadRecipes()
  const randomIndex = Math.floor(Math.random() * recipes.length)
  selectedRecipe = recipes[randomIndex]
}

// Schedule task
cron.schedule("45 12 * * *", () => {
  pickRandomRecipe()
  console.log("New random recipe selected: ", selectedRecipe)
})

// Initial pick of the recipe
pickRandomRecipe()

app.get("/random-recipe", (req, res) => {
  res.json(selectedRecipe)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
