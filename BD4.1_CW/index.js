const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  try {
    db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
    console.log("Connected to the SQLite database.");

    // Start the server only after the database connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); // Exit the application if the database connection fails
  }
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 CW - SQL Queries & async/await" });
});

// Exercise 1: Fetch all movies
async function fetchAllMovies() {
  try {
    let query = "SELECT * FROM movies";
    let response = await db.all(query);
    return { movies: response };
  } catch (error) {
    console.error("Failed to fetch movies:", error.message);
    throw error;
  }
}

app.get("/movies", async (req, res) => {
  try {
    let results = await fetchAllMovies();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});
