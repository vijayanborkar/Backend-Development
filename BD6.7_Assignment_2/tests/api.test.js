const request = require("supertest");
const http = require("http");
const {
  stocks,
  trades,
  getAllStocks,
  getAllTrades,
  getStockByTicker,
  addTrade,
} = require("../controllers");
const { app } = require("../index");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllStocks: jest.fn(),
  getStockByTicker: jest.fn(),
  addTrade: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints Tests", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  // Test 1: Get All Stocks
  it("GET /stocks should get all stocks", async () => {
    const mockedStocks = [
      { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
      {
        stockId: 2,
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2750.1,
      },
      { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
    ];

    getAllStocks.mockReturnValue(mockedStocks);

    const res = await request(server).get("/stocks");
    expect(res.statusCode).toBe(200);
    expect(res.body.stocks).toEqual(mockedStocks);
    expect(res.body.stocks.length).toBe(3);
  });

  // Test 2: Get Stock by Ticker
  it("GET /stocks/:ticker should get a stock by ticker", async () => {
    const mockedStock = [
      { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
    ];

    getStockByTicker.mockReturnValue(mockedStock);

    const res = await request(server).get("/stocks/AAPL");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ticker: mockedStock });
  });

  // Test 3: Add a New Trade
  it("POST /trades should add a new trade", async () => {
    let newTrade = {
      stockId: 1,
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    };

    const createdTrade = { id: 4, ...newTrade };
    const res = await request(server).post("/trades").send(newTrade);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(createdTrade);

    getAllStocks.mockReturnValue([
      { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
      {
        stockId: 2,
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2750.1,
      },
      { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
      createdTrade,
    ]);

    const trades = getAllTrades();
    expect(trades.length).toBe(4);
  });

  // Test 4: Error Handling for Get Stock by Invalid Ticker
  it("GET /stocks/:ticker should return 404 for non-existing show", async () => {
    getStockByTicker.mockReturnValue(null);

    const res = await request(server).get("/stocks/999");

    expect(res.statusCode).toEqual(404);
  });

  // Test 5: Input Validation for Add Trade
  it("POST /trades should return 400 for invalid input", async () => {
    const res = await request(server).post("/trades").send({
      stockId: 1,
      quantity: 10,
      tradeType: "buy",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("TradeDate is required and should be a string.");
  });
});

describe("Function Tests", () => {
  //Test 6: Mock getAllStocks Function
  test("getAllStocks should return a list of stocks", () => {
    const mockStocks = [
      { stockId: 1, ticker: "AAPL", companyName: "Apple Inc.", price: 150.75 },
      {
        stockId: 2,
        ticker: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 2750.1,
      },
      { stockId: 3, ticker: "TSLA", companyName: "Tesla, Inc.", price: 695.5 },
    ];

    getAllStocks.mockReturnValue(mockStocks);

    let result = getAllStocks();

    expect(result).toEqual(mockStocks);
    expect(getAllStocks).toHaveBeenCalled();
  });

  // Test 7: Mock Add Trade Function (Async)
  test("addTrade should return a new trade", async () => {
    const newTrade = {
      tradeId: 4,
      stockId: 1,
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    };

    addTrade.mockReturnValue(newTrade);

    let result = addTrade(newTrade);
    expect(result).toEqual(newTrade);
    expect(addTrade).toHaveBeenCalledWith(newTrade);
  });
});
