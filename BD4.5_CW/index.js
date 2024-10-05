const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const app = express();
const PORT = process.env.port || 3000;

let db;

(async () => {
  db = await open({
    filename: 'BD4.5_CW/database.sqlite',

    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Filter Movies by Year and Actor
async function filterByYearAndActor(releaseYear, actor) {
  let query = 'SELECT * FROM movies WHERE release_year = ? AND actor = ?';
  let response = await db.all(query, [releaseYear, actor]);
  return { movies: response };
}

app.get('/movies/year-actor', async (req, res) => {
  let releaseYear = req.query.releaseYear;
  let actor = req.query.actor;
  try {
    let results = await filterByYearAndActor(releaseYear, actor);
    if (results.movies.length === 0) {
      return res.status(404).json({
        message: 'No movies found for year ' + releaseYear + ' by ' + actor,
      });
    }
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Award Winning Movies
async function filterAwardWinningMovies() {
  let query = 'SELECT * FROM movies WHERE rating >= 4.5 ORDER BY rating';
  let response = await db.all(query, []);
  return { movies: response };
}

app.get('/movies/award-winning', async (req, res) => {
  try {
    let results = await filterAwardWinningMovies();
    if (results.movies.length === 0) {
      return res
        .status(404)
        .json({ message: 'No award winning movies found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Blockbuster Movies
async function fetchBlockbusterMovies() {
  let query =
    'SELECT * FROM movies WHERE box_office_collection >= 100 ORDER BY box_office_collection desc';
  let response = await db.all(query);
  return { movies: response };
}

app.get('/movies/blockbuster', async (req, res) => {
  try {
    let results = await fetchBlockbusterMovies();
    if (results.movies.length === 0) {
      return res
        .status(404)
        .json({ message: 'No award winning movies found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.5 CW Template' });
});
