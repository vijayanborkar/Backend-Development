const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.port || 3000;
let db;

(async () => {
  db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Books
async function getAllBooks() {
  let query = "SELECT * FROM books";
  let response = await db.all(query, []);
  return { books: response };
}

app.get("/books", async (req, res) => {
  try {
    let result = await getAllBooks();
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Books by Author
async function getBooksByAuthor(author) {
  let query = "SELECT * FROM books WHERE author = ?";
  let response = await db.all(query, [author]);
  return { books: response };
}

app.get("/books/author/:author", async (req, res) => {
  try {
    let result = await getBooksByAuthor(req.params.author);
    if (result.books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books of this author found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Books by Genre
async function getBooksByGenre(genre) {
  let query = "SELECT * FROM books WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { books: response };
}

app.get("/books/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await getBooksByGenre(genre);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books of this genre found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Books by Publication Year
async function getBooksByYear(year) {
  let query = "SELECT * FROM books WHERE publication_year = ?";
  let response = await db.all(query, [year]);
  return { books: response };
}

app.get("/books/year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let result = await getBooksByYear(year);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No books of this year found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 CW Template" });
});
