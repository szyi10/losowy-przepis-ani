const express = require("express")
const cors = require("cors")
const fs = require("fs")
require("dotenv").config()

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000
const API_KEY = process.env.API_KEY

let selectedRecipe = {}

const loadRecipes = () => {
  const data = fs.readFileSync("recipes.json")
  return JSON.parse(data)
}

const pickRandomRecipe = () => {
  const recipes = loadRecipes()
  const randomIndex = Math.floor(Math.random() * recipes.length)
  selectedRecipe = recipes[randomIndex]
  fs.writeFileSync("selectedRecipe.json", JSON.stringify(selectedRecipe))
}

const initializeRecipe = () => {
  if (fs.existsSync("selectedRecipe.json")) {
    const data = fs.readFileSync("selectedRecipe.json")
    selectedRecipe = JSON.parse(data)
  } else {
    pickRandomRecipe()
  }
}

initializeRecipe()

app.get("/random_recipe", (req, res) => {
  res.json(selectedRecipe)
})

const checkApiKey = (req, res, next) => {
  const apiKey = req.query.apiKey
  if (apiKey && apiKey === API_KEY) {
    next()
  } else {
    res.status(403).json({ error: "Forbidden" })
  }
}

app.post("/update-recipe", checkApiKey, (req, res) => {
  pickRandomRecipe()
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
