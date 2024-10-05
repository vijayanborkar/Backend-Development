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
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Products by category
async function fetchProductsByCategory(category) {
  let query = 'SELECT * FROM products WHERE category = ?';
  let response = await db.all(query, [category]);
  return { products: response };
}

app.get('/products/category/:category', async (req, res) => {
  try {
    let category = req.params.category;
    let result = await fetchProductsByCategory(category);
    if (result.products.length === 0) {
      return res.status(404).json({ message: 'No products found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Products by Brands
async function fetchProductsByBrand(brand) {
  let query = 'SELECT * FROM products WHERE brand = ?';
  let response = await db.all(query, [brand]);
  return { products: response };
}

app.get('/products/brand/:brand', async (req, res) => {
  try {
    let brand = req.params.brand;
    let result = await fetchProductsByBrand(brand);
    if (result.products.length === 0) {
      return res.status(404).json({ message: 'No products found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Products by Rating
async function fetchProductsByRating(rating) {
  let query = 'SELECT * FROM products WHERE rating >= ?';
  let response = await db.all(query, [rating]);
  return { products: response };
}

app.get('/products/rating/:rating', async (req, res) => {
  try {
    let rating = req.params.rating;
    let result = await fetchProductsByRating(rating);
    if (result.products.length === 0) {
      return res.status(404).json({ message: 'No products found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4 : Fetch products by stock Count
async function fetchProductsByStocks(stock) {
  let query = 'SELECT * FROM products WHERE stock <= ?';
  let response = await db.all(query, [stock]);
  return { products: response };
}

app.get('/products/stocks/:stock', async (req, res) => {
  try {
    let stock = req.params.stock;
    let result = await fetchProductsByStocks(stock);
    if (result.products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.3 CW3 Template' });
});
