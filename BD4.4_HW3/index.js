const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const app = express();
const PORT = process.env.port || 3000;

let db;
(async () => {
  db = await open({
    filename: 'BD4.4_HW3/database.sqlite',
    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Books
async function fetchAllBooks() {
  let query = 'SELECT id, title, author FROM books';
  let response = await db.all(query);
  return { books: response };
}

app.get('/books', async (req, res) => {
  try {
    let result = await fetchAllBooks();
    if (result.books.length === 0) {
      return res.status(404).json({ message: 'No books found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Books by Author
async function fetchBooksByAuthor(author) {
  let query = 'SELECT id, title, author, year FROM books WHERE author = ?';
  let response = await db.all(query, [author]);
  return { books: response };
}

app.get('/books/author/:author', async (req, res) => {
  try {
    let author = req.params.author;
    let result = await fetchBooksByAuthor(author);
    if (result.books.length === 0) {
      return res.status(404).json({ message: 'No books found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Books by Genre
async function fetchBooksByGenre(genre) {
  let query = 'SELECT id, title, author, genre FROM books WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { books: response };
}

app.get('/books/genre/:genre', async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await fetchBooksByGenre(genre);
    if (result.books.length === 0) {
      return res.status(404).json({ message: 'No books found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Books by Year
async function fetchBooksByYear(year) {
  let query = 'SELECT id, title, author, genre, year FROM books WHERE year = ?';
  let response = await db.all(query, [year]);
  return { books: response };
}

app.get('/books/year/:year', async (req, res) => {
  try {
    let year = req.params.year;
    let result = await fetchBooksByYear(year);
    if (result.books.length === 0) {
      return res.status(404).json({ message: 'No books found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.4 HW3 Template' });
});
