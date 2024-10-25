const express = require("express");
const cors = require("cors");
const {
  shows,
  theatres,
  getAllShows,
  getShowById,
  addShow,
} = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

// Exercise 1: Get All Shows
app.get("/shows", async (req, res) => {
  try {
    const allShows = await getAllShows();
    res.json({ shows: allShows });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 2: Get Show by ID
app.get("/shows/:id", async (req, res) => {
  try {
    const show = await getShowById(parseInt(req.params.id));
    if (!show) {
      return res.status(404).json({ error: "Show not found" });
    }
    return res.json({ show: show });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 3: Add a New Show
app.post("/shows", (req, res) => {
  const error = addShow(req.body);
  if (error) return res.status(400).send(error);

  const show = { id: shows.length + 1, ...req.body };
  shows.push(show);
  res.status(201).json(show);
});

module.exports = { app };
