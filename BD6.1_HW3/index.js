let { getProducts, getProductById, addProduct } = require("./product");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Exercise 1: Get All Products
app.get("/products", (req, res) => {
  res.json(getProducts());
});

// Exercise 2: Get Product by ID
app.get("/products/:id", (req, res) => {
  const product = getProductById(parseInt(req.params.id));
  res.josn(product);
});

// Exercise 3: Add New Product
app.post("/products", (req, res) => {
  const product = addProduct(req.body);
  res.status(201).json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
