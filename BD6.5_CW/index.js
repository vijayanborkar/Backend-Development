const express = require("express");
const app = express();
app.use(express.json());

let users = [];
let books = [];
let reviews = [];

// Exercise 1: Add a New User
function validateUser(user) {
  if (!user.name || typeof user.name !== "string") {
    return "Name is required and should be a string.";
  }
  if (!user.email || typeof user.email !== "string") {
    return "Email is required and should be a string.";
  }
  return null;
}

app.post("/api/users", (req, res) => {
  let error = validateUser(req.body);
  if (error) return res.status(400).send(error);

  let user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Exercise 2: Add a New Book
function validateBook(book) {
  if (!book.title || typeof book.title !== "string") {
    return "Title is required and should be a string.";
  }
  if (!book.author || typeof book.author !== "string") {
    return "Author is required and should be a string.";
  }
  return null;
}

app.post("/api/books", (req, res) => {
  let error = validateBook(req.body);
  if (error) return res.status(400).send(error);

  let book = { id: books.length + 1, ...req.body };
  books.push(book);
  res.status(201).json(book);
});

// Exercise 3: Add a New Review
function validateReview(review) {
  if (!review.content || typeof review.content !== "string") {
    return "Content is required and should be a string.";
  }
  if (!review.userId || typeof review.userId !== "number") {
    return "UserId is required and should be a number.";
  }
  return null;
}

app.post("/api/reviews", (req, res) => {
  let error = validateReview(req.body);
  if (error) return res.status(400).send(error);

  let review = { id: reviews.length + 1, ...req.body };
  reviews.push(review);
  res.status(201).json(review);
});

module.exports = { app, validateUser, validateBook, validateReview };
