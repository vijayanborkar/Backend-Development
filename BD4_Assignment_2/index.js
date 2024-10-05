const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
let cors = require("cors");
app.use(cors());
const PORT = process.env.port || 3000;
let db;

(async () => {
  db = await open({
    filename: "BD4_Assignment_2/database.sqlite",

    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Get All Games
async function getAllGames() {
  let query = "SELECT * FROM games";
  let response = await db.all(query);
  return { games: response };
}

app.get("/games", async (req, res) => {
  try {
    let result = await getAllGames();
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Game by ID
async function getGameById(id) {
  let query = "SELECT * FROM games WHERE id = ?";
  let response = await db.get(query, [id]);
  return { games: response };
}

app.get("/games/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getGameById(id);
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Games by Genre
async function getGamesByGenre(genre) {
  let query = "SELECT * FROM games WHERE genre = ?";
  let response = await db.get(query, [genre]);
  return { games: response };
}

app.get("/games/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await getGamesByGenre(genre);
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Games by Platform
async function getGamesByPlatform(platform) {
  let query = "SELECT * FROM games WHERE platform = ?";
  let response = await db.get(query, [platform]);
  return { games: response };
}

app.get("/games/platform/:platform", async (req, res) => {
  try {
    let platform = req.params.platform;
    let result = await getGamesByPlatform(platform);
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Get Games Sorted by Rating
async function getGamesByRating() {
  let query = "SELECT * FROM games ORDER BY rating DESC";
  let response = await db.get(query);
  return { games: response };
}

app.get("/games/sort-by-rating", async (req, res) => {
  try {
    let result = await getGamesByRating();
    if (result.games.length === 0) {
      return res.status(404).json({ message: "No games found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Get All Players
async function getAllPlayers() {
  let query = "SELECT * FROM players";
  let response = await db.all(query);
  return { players: response };
}

app.get("/players", async (req, res) => {
  try {
    let result = await getAllPlayers();
    if (result.players.length === 0) {
      return res.status(404).json({ message: "No players found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Get Player by ID
async function getPlayerId(id) {
  let query = "SELECT * FROM players WHERE id = ?";
  let response = await db.get(query, [id]);
  return { players: response };
}

app.get("/players/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getPlayerId(id);
    if (result.players.length === 0) {
      return res.status(404).json({ message: "No players found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Get Players by Platform
async function getPlayerByPlatform(platform) {
  let query = "SELECT * FROM players WHERE platform = ?";
  let response = await db.get(query, [platform]);
  return { players: response };
}

app.get("/players/platform/:platform", async (req, res) => {
  try {
    let platform = req.params.platform;
    let result = await getPlayerByPlatform(platform);
    if (result.players.length === 0) {
      return res.status(404).json({ message: "No players found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 9: Get Players Sorted by Rating
async function playersSortedByRating() {
  let query = "SELECT * FROM players ORDER BY rating DESC";
  let response = await db.get(query);
  return { players: response };
}

app.get("/players/sort-by-rating", async (req, res) => {
  try {
    let result = await playersSortedByRating();
    if (result.players.length === 0) {
      return res.status(404).json({ message: "No players found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 10: Get All Tournaments
async function getAllTournaments() {
  let query = "SELECT * FROM tournaments";
  let response = await db.all(query);
  return { tournaments: response };
}

app.get("/tournaments", async (req, res) => {
  try {
    let result = await getAllTournaments();
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: "No tournaments found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 11: Get Tournament by ID
async function getTournamentById(id) {
  let query = "SELECT * FROM tournaments WHERE id = ?";
  let response = await db.get(query, [id]);
  return { tournaments: response };
}

app.get("/tournaments/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await getTournamentById(id);
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: "No tournaments found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 12: Get Tournaments by Game ID
async function getTournamentByGameId(gameId) {
  let query = "SELECT * FROM tournaments WHERE gameId = ?";
  let response = await db.get(query, [gameId]);
  return { tournaments: response };
}

app.get("/tournaments/game/:gameId", async (req, res) => {
  try {
    let gameId = parseInt(req.params.gameId);
    let result = await getTournamentByGameId(gameId);
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: "No tournaments found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 13: Get Tournaments Sorted by Prize Pool
async function getTournamentByPrizePool() {
  let query = "SELECT * FROM tournaments ORDER BY prizePool DESC";
  let response = await db.get(query);
  return { tournaments: response };
}

app.get("/tournaments/sort-by-prize-pool", async (req, res) => {
  try {
    let result = await getTournamentByPrizePool();
    if (result.tournaments.length === 0) {
      return res.status(404).json({ message: "No tournaments found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4 Assignment 2 Template" });
});
