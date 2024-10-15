const express = require("express");
const app = express();
app.use(express.json());

let games = [
  {
    id: 1,
    title: "The Legend of Zelda",
    genre: "Adventure",
    developer: "Nintendo",
  },
  {
    id: 2,
    title: "Super Mario Bros",
    genre: "Platformer",
    developer: "Nintendo",
  },
];

let developers = [{ id: 1, name: "Nintendo", country: "Japan" }];

// Functions

async function getAllGames() {
  return games;
}

async function getGameById(id) {
  return games.find((game) => game.id === id);
}

async function addGame(game) {
  game.id = games.length + 1;
  games.push(game);
  return game;
}

async function getDeveloperById(id) {
  return developers.find((developer) => developer.id === id);
}

async function addDeveloper(developer) {
  developer.id = developers.length + 1;
  developers.push(developer);
  return developer;
}

// Exercise 1: Get All Games
app.get("/games", async (req, res) => {
  let games = await getAllGames();
  res.json(games);
});

// Exercise 2: Get Game by ID
app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let game = await getGameById(id);
  if (!game) {
    return res.status(404).json("Game not found");
  } else {
    return res.json(game);
  }
});

// Exercise 3: Add a New Game
app.post("/games/new", async (req, res) => {
  let newGame = await addGame(req.body);
  res.status(201).json(newGame);
});

// Exercise 4: Get Developer by ID
app.get("/developers/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let developer = await getDeveloperById(id);
  if (!developer) {
    return res.status(404).json("Developer not found");
  } else {
    return res.json(developer);
  }
});

// Exercise 5: Add a New Developer
app.post("/developers/new", async (req, res) => {
  let newDeveloper = await addDeveloper(req.body);
  res.status(201).json(newDeveloper);
});

module.exports = {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
};
