const cors = require("cors");
const express = require("express");
const { getAllBooks, getBookById } = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

// Exercise 1: Retrieve All Books
app.get("/books", async (req, res) => {
  const books = getAllBooks();
  res.json({ books });
});

// Exercise 2: Retrieve Book by ID
app.get("/books/details/:id", async (req, res) => {
  let book = getBookById(parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json({ book });
});

module.exports = { app };
