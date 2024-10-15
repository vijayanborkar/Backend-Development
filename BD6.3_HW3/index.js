const express = require("express");
const app = express();
app.use(express.json());

let recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Hard",
  },
];

// Functions

async function getAllRecipes() {
  return recipes;
}

async function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

async function addRecipe(recipe) {
  recipe.id = recipes.length + 1;
  recipes.push(recipe);
  return recipe;
}

// Exercise 1 : Get All Recipes
app.get("/recipes", async (req, res) => {
  let recipes = await getAllRecipes();
  return res.json(recipes);
});

// Exercise 2 : Get Recipe by ID
app.get("/recipes/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let recipe = await getRecipeById(id);
  if (!recipe) {
    return res.status(404).json("Recipe not found");
  } else {
    return res.json(recipe);
  }
});

// Exercise 3 : Add a New Recipe
app.post("/recipes/new", async (req, res) => {
  let newRecipe = await addRecipe(req.body);
  return res.status(201).json(newRecipe);
});

module.exports = { app, getAllRecipes, getRecipeById, addRecipe };
