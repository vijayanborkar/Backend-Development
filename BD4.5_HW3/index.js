const express = require('express');

const sqlite3 = require('sqlite3').verbose();

const { open } = require('sqlite');

const app = express();

const PORT = process.env.port || 3000;

let db;

(async () => {
  db = await open({
    filename: 'BD4.5_HW3/database.sqlite',

    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch Kitchen Items by Minimum Rating
async function filterKitchenItemsByRating(minRating) {
  let query = 'SELECT * FROM kitchen_items WHERE rating > ?';
  let response = await db.all(query, [minRating]);
  return { kitchenItems: response };
}

app.get('/kitchen-items/rating', async (req, res) => {
  try {
    let minRating = parseFloat(req.query.minRating);
    let result = await filterKitchenItemsByRating(minRating);
    if (result.kitchenItems.length === 0) {
      return res.status(404).json({ message: 'No kitchenItems found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Kitchen Items by Material and Rating
async function filterKitchenItemsByMaterialRating(material, minRating) {
  let query = 'SELECT * FROM kitchen_items WHERE material = ? AND rating >= ?';
  let response = await db.all(query, [material, minRating]);
  return { kitchenItems: response };
}

app.get('/kitchen-items/material-rating', async (req, res) => {
  try {
    let material = req.query.material;
    let minRating = parseFloat(req.query.minRating);
    let result = await filterKitchenItemsByMaterialRating(material, minRating);
    if (result.kitchenItems.length === 0) {
      return res.status(404).json({ message: 'No kitchenItems found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Kitchen Items Ordered by Price
async function filterKitchenItemsOrderedByPrice() {
  let query = 'SELECT * FROM kitchen_items ORDER BY price DESC';
  let response = await db.all(query);
  return { kitchenItems: response };
}

app.get('/kitchen-items/ordered-by-price', async (req, res) => {
  try {
    let result = await filterKitchenItemsOrderedByPrice();
    if (result.kitchenItems.length === 0) {
      return res.status(404).json({ message: 'No kitchenItems found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.5 HW3 Template' });
});
