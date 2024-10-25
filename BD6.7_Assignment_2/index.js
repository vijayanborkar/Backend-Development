const express = require("express");
const cors = require("cors");
const {
  stocks,
  trades,
  getAllStocks,
  getAllTrades,
  getStockByTicker,
  addTrade,
} = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

// Test 1: Get All Stocks
app.get("/stocks", async (req, res) => {
  try {
    const stocks = await getAllStocks();
    res.json({ stocks: stocks });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Trades
app.get("/trades", async (req, res) => {
  try {
    const trades = await getAllTrades();
    res.json({ trades: trades });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Test 2: Get Stock by Ticker
app.get("/stocks/:ticker", async (req, res) => {
  try {
    const ticker = await getStockByTicker(req.params.ticker);
    if (!ticker) {
      return res.status(404).json({ error: "Ticker not found" });
    }
    return res.json({ ticker: ticker });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Test 3: Add a New Trade
app.post("/trades", (req, res) => {
  const errors = addTrade(req.body);

  if (errors) {
    return res.status(400).json({ error: errors });
  }

  const trade = { id: trades.length + 1, ...req.body };
  trades.push(trade);
  res.status(201).json(trade);
});

module.exports = { app };
