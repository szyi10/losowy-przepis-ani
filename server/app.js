const express = require("express")
const cors = require("cors")
const fs = require("fs")
const { initializeApp } = require("firebase/app")
const { getDatabase, set, ref, child, get } = require("firebase/database")
require("firebase/database")
require("dotenv").config()

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3000
const API_KEY = process.env.API_KEY

const firebaseConfig = {
  apiKey: "AIzaSyCF1_6Pdh93k1CRHJ9TFXLAGiJ_JCkNy1U",
  authDomain: "losowy-przepis-81a65.firebaseapp.com",
  databaseURL:
    "https://losowy-przepis-81a65-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "losowy-przepis-81a65",
  storageBucket: "losowy-przepis-81a65.appspot.com",
  messagingSenderId: "375623363213",
  appId: "1:375623363213:web:9f66dfe950cf93a04a50c4",
}

const firebaseApp = initializeApp(firebaseConfig)
const database = getDatabase(firebaseApp)

let selectedRecipe = {}

const loadRecipes = () => {
  const data = fs.readFileSync("recipes.json")
  return JSON.parse(data)
}

const pickRandomRecipe = async () => {
  const recipes = loadRecipes()
  const randomIndex = Math.floor(Math.random() * recipes.length)
  selectedRecipe = recipes[randomIndex]
  set(ref(database, "selectedRecipe"), selectedRecipe)
}

const initializeRecipe = async () => {
  const dbRef = ref(getDatabase())
  get(child(dbRef, "selectedRecipe"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return
      } else {
        pickRandomRecipe()
      }
    })
    .catch((error) => console.log(error))
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

app.get("/update-recipe", checkApiKey, (req, res) => {
  pickRandomRecipe()
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
