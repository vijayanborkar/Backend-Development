let express = require("express");
let app = express();
let port = 3000;

// Question 1:
let book = {
  title: "The God of Small Things",
  author: "Arundhati Roy",
  publicationYear: 1997,
  genre: "Novel",
  isAvaliable: true,
  stock: 5,
};

app.get("/book", (req, res) => {
  res.json(book);
});

// Question 2:
function getFullTitleAndAuthor(book) {
  return book.title + " by " + book.author;
}

app.get("/book/fulltitle-author", (req, res) => {
  let fullTitleAndAuthor = getFullTitleAndAuthor(book);
  res.json({ fullTitleAndAuthor: fullTitleAndAuthor });
});

// Question 3:
function getGenreAndAvailability(book) {
  return {
    genre: book.genre,
    isAvaliable: book.isAvaliable,
  };
}

app.get("/book/genre-availability", (req, res) => {
  let genreAndAvailability = getGenreAndAvailability(book);
  res.json(genreAndAvailability);
});

// Question 4:
function getCalculateBookAge(book) {
  let currentYear = 2024;
  let age = currentYear - book.publicationYear;
  return age;
}

app.get("/book/age", (req, res) => {
  let bookAge = getCalculateBookAge(book);
  res.json({ age: bookAge });
});

// Question 5:
function getBookSummary(book) {
  return (
    "Title: " +
    book.title +
    ", Author: " +
    book.author +
    ", Genre: " +
    book.genre +
    ", Published: " +
    book.publicationYear
  );
}

app.get("/book/summary", (req, res) => {
  let summary = getBookSummary(book);
  res.json({ summary: summary });
});

// Question 6:
function getcheckStockAndOrder(book) {
  if (book.stock > 0) {
    return { status: "In Stock", stock: book.stock };
  } else {
    return {
      status: "Out of Stock",
      message: "The order can be palced only when the stock is available",
    };
  }
}

app.get("/book/stock-status", (req, res) => {
  let stockStatus = getcheckStockAndOrder(book);
  res.json(stockStatus);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
