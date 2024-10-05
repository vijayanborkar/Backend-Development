const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW3 Template" });
});

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Products
async function fetchAllProducts() {
  let query = "SELECT * FROM products";
  let response = await db.all(query);
  return { products: response };
}

app.get("/products", async (req, res) => {
  let result = await fetchAllProducts();
  res.status(200).json(result);
});

// Exercise 2: Retrieve Products by Brand
async function retrieveProductsbyBrand(brand) {
  let query = "SELECT * FROM products WHERE brand = ?";
  let response = await db.all(query, [brand]);
  return { products: response };
}

app.get("/products/brand/:brand", async (req, res) => {
  let brand = req.params.brand;
  let result = await retrieveProductsbyBrand(brand);
  res.status(200).json(result);
});

// Exercise 3: Retrieve Products by Category
async function retrieveProductsbyCategory(category) {
  let query = "SELECT * FROM products WHERE category = ?";
  let response = await db.all(query, [category]);
  return { category: response };
}

app.get("/products/category/:category", async (req, res) => {
  let category = req.params.category;
  let result = await retrieveProductsbyCategory(category);
  res.status(200).json(result);
});

// Exercise 4: Retrieve Products by stocks
async function retrieveProductsbyStocks(stock) {
  let query = "SELECT * FROM products WHERE stock = ?";
  let response = await db.all(query, [stock]);
  return { products: response };
}

app.get("/products/stock/:stock", async (req, res) => {
  let stock = req.params.stock;
  let result = await retrieveProductsbyStocks(stock);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
