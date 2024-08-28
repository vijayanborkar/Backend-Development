const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.port || 3000;
let db;

(async () => {
  db = await open({
    filename: "tracks_database.sqlite",
    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Retrieve All Tracks
async function getAllTracks() {
  let query = "SELECT * FROM tracks";
  let response = await db.all(query, []);
  return { tracks: response };
}

app.get("tracks", async (req, res) => {
  try {
    let result = await getAllTracks();
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Retrieve Tracks by Artist
async function getTracksbyArtist(artist) {
  let query = "SELECT * FROM tracks WHERE artist = ?";
  let response = await db.all(query, [artist]);
  return { tracks: response };
}

app.get("tracks/artist/:artist", async (req, res) => {
  try {
    let artist = req.params.artist;
    let result = await getTracksbyArtist(artist);
    if (result.tracks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tracks of this artist found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Retrieve Tracks by Genre
async function getTracksbyGenre(genre) {
  let query = "SELECT * FROM tracks WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { tracks: response };
}

app.get("/tracks/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let result = await getTracksbyGenre(genre);
    if (result.tracks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tracks of this genre found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Retrieve Tracks by Release Year
async function getTracksbyYear(year) {
  let query = "SELECT * FROM tracks WHERE release_year = ?";
  let response = await db.all(query, [year]);
  return { tracks: response };
}

app.get("/tracks/release_year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let result = await getTracksbyYear(year);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No tracks of this year found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW2 Template" });
});
