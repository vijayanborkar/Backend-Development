let stocks = [
  { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
  { stockId: 2, ticker: "GOOGL", companyName: "Alphabet Inc.", price: 2750.1 },
  { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
];

let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: "buy",
    tradeDate: "2024-08-07",
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: "sell",
    tradeDate: "2024-08-06",
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: "buy",
    tradeDate: "2024-08-05",
  },
];

function getAllStocks() {
  return stocks;
}

function getAllTrades() {
  return trades;
}

function getStockByTicker(tickerSymbol) {
  return stocks.find((stock) => stock.ticker === tickerSymbol);
}

function addTrade(trade) {
  if (!trade.stockId || typeof trade.stockId !== "number") {
    return "StockId is required and should be a number.";
  }
  if (!trade.quantity || typeof trade.quantity !== "number") {
    return "Quantity is required and should be a number.";
  }
  if (!trade.tradeType || typeof trade.tradeType !== "string") {
    return "TradeType is required and should be a string.";
  }
  if (!trade.tradeDate || typeof trade.tradeDate !== "string") {
    return "TradeDate is required and should be a string.";
  }
  return null;
}

module.exports = {
  stocks,
  trades,
  getAllStocks,
  getAllTrades,
  getStockByTicker,
  addTrade,
};
