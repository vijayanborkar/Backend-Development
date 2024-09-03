const express = require('express');

const sqlite3 = require('sqlite3').verbose();

const { open } = require('sqlite');

const app = express();

const PORT = process.env.port || 3000;

let db;

(async () => {
  db = await open({
    filename: 'database.sqlite',

    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Artworks
async function fetchAllArtworks() {
  let query = 'SELECT id, title, artist FROM artworks';
  let response = await db.all(query);
  return { artworks: response };
}

app.get('/artworks', async (req, res) => {
  try {
    let result = await fetchAllArtworks();
    if (result.artworks.length === 0) {
      return res.status(404).json({ message: 'No artworks found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Artworks by Artist
async function fetchArtworksByArtist(artist) {
  let query = 'SELECT id, title, artist, year FROM artworks WHERE artist = ?';
  let response = await db.all(query, [artist]);
  return { artworks: response };
}

app.get('/artworks/artist/:artist', async (req, res) => {
  try {
    let artist = req.params.artist;
    let result = await fetchArtworksByArtist(artist);
    if (result.artworks.length === 0) {
      return res.status(404).json({ message: 'No artworks found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Artworks by Year
async function fetchArtworksByYear(year) {
  let query = 'SELECT id, title, artist, year FROM artworks WHERE year = ?';
  let response = await db.all(query, [year]);
  return { artworks: response };
}

app.get('/artworks/year/:year', async (req, res) => {
  try {
    let year = req.params.year;
    let result = await fetchArtworksByYear(year);
    if (result.artworks.length === 0) {
      return res.status(404).json({ message: 'No artworks found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Artworks by Medium
async function fetchArtworksByMedium(medium) {
  let query = 'SELECT id, title, artist, medium FROM artworks WHERE medium = ?';
  let response = await db.all(query, [medium]);
  return { artworks: response };
}

app.get('/artworks/medium/:medium', async (req, res) => {
  try {
    let medium = req.params.medium;
    let result = await fetchArtworksByMedium(medium);
    if (result.artworks.length === 0) {
      return res.status(404).json({ message: 'No artworks found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.3 CW3 Template' });
});
