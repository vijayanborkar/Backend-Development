let { getBooks, getBookById, getReviews, getReviewById } = require("./book");
const express = require("express");
const app = express();
app.use(express.json());

// Exercise 1: Get All Books
app.get("/api/books", async (req, res) => {
  try {
    const books = await getBooks();
    if (books.length === 0) {
      return res.status(404).json({ error: "No Books Found." });
    }
    return res.json(books);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 2: Get Book by ID
app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await getBookById(parseInt(req.params.id));
    if (!book) {
      return res.status(404).json({ error: "Book Not Found." });
    }
    return res.json(book);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 3: Get All Reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await getReviews();
    if (reviews.length === 0) {
      return res.status(404).json({ error: "No Reviews Found." });
    }
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 4: Get Review by ID
app.get("/api/reviews/:id", async (req, res) => {
  try {
    const review = await getReviewById(parseInt(req.params.id));
    if (!review) return res.status(404).json({ error: "Review Not Found." });
    return res.json(review);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
