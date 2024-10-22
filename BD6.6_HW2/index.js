const cors = require("cors");
const express = require("express");
const { getAllGames, getGameById } = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

// Exercise 1: Retrieve All Games
app.get("/games", async (req, res) => {
  const games = getAllGames();
  res.json({ games });
});

// Exercise 2: Retrieve Game by ID
app.get("/games/details/:id", async (req, res) => {
  let game = getGameById(parseInt(req.params.id));
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }
  res.json({ game });
});

module.exports = { app };
