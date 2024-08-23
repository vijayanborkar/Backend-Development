const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW2 Template" });
});

// YOUR ENDPOINTS GO HERE

// Exercise 1: Retrieve All Tracks
async function retrieveAllTracks() {
  let query = "SELECT * FROM tracks";
  let response = await db.all(query);
  return { tracks: response };
}

app.get("/tracks", async (req, res) => {
  let result = await retrieveAllTracks();
  res.status(200).json(result);
});

// Exercise 2: Retrieve Tracks by Artist
async function retrieveTracksByArtist(artist) {
  let query = "SELECT * FROM tracks WHERE artist = ?";
  let response = await db.all(query, [artist]);
  return { tracks: response };
}

app.get("/tracks/artist/:artist", async (req, res) => {
  let artist = req.params.artist;
  let result = await retrieveTracksByArtist(artist);
  res.status(200).json(result);
});

// Exercise 3: Retrieve Tracks by Genre
async function retrieveTracksByGenre(genre) {
  let query = "SELECT * FROM tracks WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { tracks: response };
}

app.get("/tracks/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let result = await retrieveTracksByGenre(genre);
  res.status(200).json(result);
});

// Exercise 4: Retrieve Tracks by Release Year
async function retrieveTracksByReleaseYear(year) {
  let query = "SELECT * FROM tracks WHERE release_year = ?";
  let response = await db.all(query, [year]);
  return { tracks: response };
}

app.get("/tracks/release_year/:year", async (req, res) => {
  let year = req.params.year;
  let result = await retrieveTracksByReleaseYear(year);
  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
