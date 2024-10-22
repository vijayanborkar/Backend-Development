const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
let cors = require("cors");
app.use(cors());
const PORT = process.env.port || 3000;
let db;

(async () => {
  db = await open({
    filename: "BD4_Assignment_1/database.sqlite",

    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Get All Restaurants
async function getAllRestaurants() {
  let query = "SELECT * FROM restaurants";
  let response = await db.all(query);
  return { restaurants: response };
}

app.get("/restaurants", async (req, res) => {
  try {
    let result = await getAllRestaurants();
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Restaurant by ID
async function getRestaurantById(id) {
  let query = "SELECT * FROM restaurants WHERE id = ?";
  let response = await db.all(query, [id]);
  return { restaurants: response };
}

app.get("/restaurants/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getRestaurantById(id);
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Restaurants by Cuisine
async function fetchRestaurantsByCuisine(cuisine) {
  let query = "SELECT * FROM restaurants WHERE cuisine = ?";
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}

app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    let cuisine = req.params.cuisine;
    let result = await fetchRestaurantsByCuisine(cuisine);
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Restaurants by Filter
async function fetchRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?";
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}

app.get("/restaurants/filter", async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    let hasOutdoorSeating = req.query.hasOutdoorSeating;
    let isLuxury = req.query.isLuxury;
    let result = await fetchRestaurantsByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury,
    );
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Get Restaurants Sorted by Rating
async function getRestaurantsSortedByRating() {
  let query = "SELECT * FROM restaurants ORDER BY rating DESC";
  let response = await db.all(query);
  return { restaurants: response };
}

app.get("/restaurants/sort-by-rating", async (req, res) => {
  try {
    let result = await getRestaurantsSortedByRating();
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Get All Dishes
async function getAllDishes() {
  let query = "SELECT * FROM dishes";
  let response = await db.all(query);
  return { dishes: response };
}

app.get("/dishes", async (req, res) => {
  try {
    let result = await getAllDishes();
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Get Dish by ID
async function getIdByDish(id) {
  let query = "SELECT * FROM dishes WHERE id = ?";
  let response = await db.all(query, [id]);
  return { dishes: response };
}

app.get("/dishes/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getIdByDish(id);
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Get Dishes by Filter
async function getDishesByFilter(isVeg) {
  let query = "SELECT * FROM dishes WHERE isVeg = ?";
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get("/dishes/filter", async (req, res) => {
  try {
    let isVeg = req.query.isVeg;
    let result = await getDishesByFilter(isVeg);
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 9: Get Dishes Sorted by Price
async function getDishesSortedByPrice() {
  let query = "SELECT * FROM dishes ORDER BY price";
  let response = await db.all(query);
  return { dishes: response };
}

app.get("/dishes/sort-by-price", async (req, res) => {
  try {
    let result = await getDishesSortedByPrice();
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: "No dishes found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4 Assignment 1 Template" });
});
