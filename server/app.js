const express = require("express")
const cors = require("cors")
const cron = require("node-cron")
const fs = require("fs")

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000

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

const scheduleDailyTask = () => {
  const now = new Date()
  const next = new Date()
  next.setHours(13)
  next.setMinutes(8)
  next.setSeconds(0)
  if (now > next) {
    next.setDate(next.getDate() + 1)
  }
  const delay = next.getTime() - now.getTime()

  setTimeout(() => {
    pickRandomRecipe()
    setInterval(pickRandomRecipe, 24 * 60 * 60 * 1000)
  }, delay)
}

initializeRecipe()
scheduleDailyTask()

app.get("/random_recipe", (req, res) => {
  res.json(selectedRecipe)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
