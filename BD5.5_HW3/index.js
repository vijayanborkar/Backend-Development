let express = require("express");
let { recipe } = require("./models/recipe.model");
let { user } = require("./models/user.model");
let { favorite } = require("./models/favorite.model");
let { sequelize } = require("./lib/index");
let { Op } = require("@sequelize/core");

let app = express();
app.use(express.json());

// users
let users = [
  {
    username: "foodlover",
    email: "foodlover@example.com",
    password: "securepassword",
  },
];

// recipes
let recipes = [
  {
    title: "Spaghetti Carbonara",
    chef: "Chef Luigi",
    cuisine: "Italian",
    preparationTime: 30,
    instructions:
      "Cook spaghetti. In a bowl, mix eggs, cheese, and pepper. Combine with pasta and pancetta.",
  },
  {
    title: "Chicken Tikka Masala",
    chef: "Chef Anil",
    cuisine: "Indian",
    preparationTime: 45,
    instructions:
      "Marinate chicken in spices and yogurt. Grill and serve with a creamy tomato sauce.",
  },
  {
    title: "Sushi Roll",
    chef: "Chef Sato",
    cuisine: "Japanese",
    preparationTime: 60,
    instructions:
      "Cook sushi rice. Place rice on nori, add fillings, roll, and slice into pieces.",
  },
  {
    title: "Beef Wellington",
    chef: "Chef Gordon",
    cuisine: "British",
    preparationTime: 120,
    instructions:
      "Wrap beef fillet in puff pastry with mushroom duxelles and bake until golden.",
  },
  {
    title: "Tacos Al Pastor",
    chef: "Chef Maria",
    cuisine: "Mexican",
    preparationTime: 50,
    instructions:
      "Marinate pork in adobo, grill, and serve on tortillas with pineapple and cilantro.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await user.bulkCreate(users);
    await recipe.bulkCreate(recipes);
    res.status(200).json({ message: "Database Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// Exercise 1: Favorite a Recipe
async function favoriteRecipe(data) {
  let favoriteRecipe = await favorite.create({
    userId: data.userId,
    recipeId: data.recipeId,
  });
  return { message: "Recipe favorited", favoriteRecipe };
}

app.get("/users/:id/favorite", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let recipeId = parseInt(req.query.recipeId);
    let response = await favoriteRecipe({ userId, recipeId });
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Unfavorite a Recipe
async function unfavoriteRecipe(data) {
  let unfavoriteRecipe = await favorite.destroy({
    where: {
      userId: data.userId,
      recipeId: data.recipeId,
    },
  });
  if (unfavoriteRecipe === 0) {
    return {};
  } else {
    return { message: "Recipe Unfavorited" };
  }
}

app.get("/users/:id/unfavorite", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let recipeId = parseInt(req.query.recipeId);
    let response = await unfavoriteRecipe({ userId, recipeId });
    if (!response.message) {
      return res
        .status(404)
        .json({ message: "This recipe cannot be unfavorited" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get All Favorited Recipes
async function getAllFavoritedRecipes(userId) {
  let recipeIds = await favorite.findAll({
    where: { userId },
    attributes: ["recipeId"],
  });
  let recipeRecords = [];
  for (let i = 0; i < recipeIds.length; i++) {
    recipeRecords.push(recipeIds[i].recipeId);
  }
  let favoritedRecipes = await recipe.findAll({
    where: { id: { [Op.in]: recipeRecords } },
  });
  return { favoritedRecipes };
}

app.get("/users/:id/favorites", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let response = await getAllFavoritedRecipes(userId);
    if (response.favoritedRecipes.length === 0) {
      return res
        .status(404)
        .json({ message: "This user has not favorited any recipes" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
