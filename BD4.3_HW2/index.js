const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.port || 3000;
let db;

(async () => {
  db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Recipes by Cuisine
async function filterByCuisine(cuisine) {
  let query = 'SELECT * FROM recipes WHERE cuisine = ?';
  let response = await db.all(query, [cuisine]);
  return { recipes: response };
}

app.get('/recipes/cuisine/:cuisine', async (req, res) => {
  try {
    let cuisine = req.params.cuisine;
    let result = await filterByCuisine(cuisine);
    if (result.recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch All Recipes by Main Ingredient
async function filterByMainIngredient(mainIngredient) {
  let query = 'SELECT * FROM recipes WHERE main_ingredient = ?';
  let response = await db.all(query, [mainIngredient]);
  return { recipes: response };
}

app.get('/recipes/main_ingredient/:main_ingredient', async (req, res) => {
  try {
    let mainIngredient = req.params.main_ingredient;
    let result = await filterByMainIngredient(mainIngredient);
    if (result.recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch All Recipes by Preparation Time
async function filterByPreparationTime(preparation_time) {
  let query = 'SELECT * FROM recipes WHERE preparation_time <= ?';
  let response = await db.all(query, [preparation_time]);
  return { recipes: response };
}

app.get('/recipes/preparation_time/:preparation_time', async (req, res) => {
  try {
    let preparation_time = req.params.preparation_time;
    let result = await filterByPreparationTime(preparation_time);
    if (result.recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch All Recipes by Difficulty
async function filterByDifficulty(difficulty) {
  let query = 'SELECT * FROM recipes WHERE difficulty = ?';
  let response = await db.all(query, [difficulty]);
  return { recipes: response };
}

app.get('/recipes/difficulty/:difficulty', async (req, res) => {
  try {
    let difficulty = req.params.difficulty;
    let result = await filterByDifficulty(difficulty);
    if (result.recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Fetch All Recipes by Vegetarian Status
async function filterByVegetarian(vegetarian) {
  let query = 'SELECT * FROM recipes WHERE vegetarian = ?';
  let response = await db.all(query, [vegetarian]);
  return { recipes: response };
}

app.get('/recipes/vegetarian/:vegetarian', async (req, res) => {
  try {
    let vegetarian = req.params.vegetarian.toLowerCase();
    let result = await filterByVegetarian(vegetarian);
    if (vegetarian !== 'true' && vegetarian !== 'false') {
      return res.status(404).json({ message: 'No recipes found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.3 HW2 Template' });
});
