const cors = require("cors");
const express = require("express");
const { getAllMovies, getMovieById } = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

// Exercise 1: Retrieve All Movies
app.get("/movies", async (req, res) => {
  const movies = getAllMovies();
  res.json({ movies });
});

// Exercise 2: Retrieve Movie by ID
app.get("/movies/details/:id", async (req, res) => {
  let movie = getMovieById(parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  res.json({ employee });
});

module.exports = { app };
