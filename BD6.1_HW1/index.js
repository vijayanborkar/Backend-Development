let { getMovies, getMovieById, addMovie } = require("./movie");
const express = require("express");
const app = express();
const PORT = 3000;

// Exercise 1: Get all movies
app.get("/movies", (req, res) => {
  res.json(getMovies());
});

// Exercise 2: Get movie by ID
app.get("/movies/:id", (req, res) => {
  const movie = getMovieById(parseInt(req.params.id));
  if (!movie) return res.status(404).json("Movie not found");
  res.json(movie);
});

// Exercise 3: Add new movie
app.post("/movies", (req, res) => {
  const movie = addMovie(req.body);
  res.status(201).json(movie);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
