const request = require("supertest");
const http = require("http");
const { getAllGames, getGameById } = require("../controllers");
const { app } = require("../index");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close();
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all movies", () => {
    let mockedGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getAllGames.mockReturnValue(mockedGames);
    let result = getAllGames();
    expect(result).toEqual(mockedGames);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoints Tests", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("GET /games should get all games", async () => {
    let mockedGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];

    getAllGames.mockReturnValue(mockedGames);

    const res = await request(server).get("/games");
    expect(res.statusCode).toBe(200);
    expect(res.body.games).toEqual(mockedGames);
    expect(res.body.movies.length).toBe(3);
  });

  it("GET /games/details/:id should get an game by Id", async () => {
    let mockedGame = {
      gameId: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      genre: "Adventure",
      platform: "Nintendo Switch",
    };

    getGameById.mockReturnValue(mockedGame);

    const res = await request(server).get("/games/details/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      game: mockedGame,
    });
  });
});
