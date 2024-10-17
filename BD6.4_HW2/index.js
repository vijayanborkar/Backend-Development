let {
  getAllGames,
  getGameById,
  getAllGenres,
  getGenreById,
} = require("./game.js");
const express = require("express");
const app = express();
app.use(express.json());

// Exercise 1: Get All Games
app.get("/api/games", async (req, res) => {
  try {
    const games = await getAllGames();
    if (games.length === 0) {
      return res.status(404).json({ error: "No Games Found" });
    }
    return res.json(games);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 2: Get Game by ID
app.get("/api/games/:id", async (req, res) => {
  try {
    const game = await getGameById(parseInt(req.params.id));
    if (!game) {
      return res.status(404).json({ error: "No Game Found" });
    }
    return res.json(game);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 3: Get All Genres
app.get("/api/genres", async (req, res) => {
  try {
    const genres = await getAllGenres();
    if (genres.length === 0) {
      return res.status(404).json({ error: "No Genres Found" });
    }
    return res.json(genres);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 4: Get Genre by ID
app.get("/api/genres/:id", async (req, res) => {
  try {
    const genre = await getGenreById(parseInt(req.params.id));
    if (!genre) {
      return res.status(404).json({ error: "No Genre Found" });
    }
    return res.json(genre);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
