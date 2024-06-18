const express = require("express")
const cors = require("cors")
const fs = require("fs")
const schedule = require("node-schedule")
const path = require("path")

const app = express()
app.use(cors())

let recipes = []
let selectedRecipe = {}

// Load recipes from JSON file
fs.readFile(path.join(__dirname, "recipes.json"), "utf8", (err, data) => {
  if (err) {
    console.error("Error reading recipes.json:", err)
    return
  }
  recipes = JSON.parse(data)
})

// Function to select a random recipe
function selectRandomRecipe() {
  if (recipes.length > 0) {
    selectedRecipe = recipes[Math.floor(Math.random() * recipes.length)]
  }
}

// Schedule job to run daily at 6:30 AM EST
const est = "America/New_York"
schedule.scheduleJob({ hour: 6, minute: 30, tz: est }, selectRandomRecipe)

// Endpoint to get the randomly selected recipe
app.get("/random_recipe", (req, res) => {
  res.json(selectedRecipe)
})

// Endpoint to manually trigger selecting a random recipe
app.get("/trigger_random_recipe", (req, res) => {
  selectRandomRecipe()
  res.json(selectedRecipe)
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
