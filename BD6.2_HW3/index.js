const express = require("express");
const app = express();
app.use(express.json());

let products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Coffee Maker", category: "Appliances" },
  { id: 3, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Running Shoes", category: "Footwear" },
];

// Exercise 1: Get All Products
function getProducts() {
  return products;
}

app.get("/products", (req, res) => {
  res.json(getProducts());
});

// Exercise 2: Get Product by ID
function getProductById(id) {
  return products.find((product) => product.productId === id);
}

app.get("/product/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let product = getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

// Exercise 3: Add New Product
function addProduct(product) {
  product.push(product);
  return product;
}

app.post("/products/new", (req, res) => {
  let productId = req.params.productId;
  let name = req.params.name;
  let category = req.params.category;
  let addedProduct = addedProduct({ productId, name, category });
  res.status(201).json(addedProduct);
});

module.exports = { app, getProducts, getProductById, addProduct };
