const request = require("supertest");
const { app } = require("../index.js");
const {
  getAllGames,
  getGameById,
  getAllGenres,
  getGenreById,
} = require("../game.js");
const http = require("http");

jest.mock("../game.js", () => ({
  ...jest.requireActual("../game.js"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  getAllGenres: jest.fn(),
  getGenreById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Error Handling Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET API /api/games should return 404 if no games are found", async () => {
    getAllGames.mockReturnValue([]);

    const response = await request(server).get("/api/games");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No Games Found");
  });

  it("GET API /api/games/:id should return 404 for non-existing games", async () => {
    getGameById.mockReturnValue(null);

    const response = await request(server).get("/api/games/999");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No Game Found");
  });

  it("GET API /api/genres should return 404 if no genres are found", async () => {
    getAllGenres.mockReturnValue([]);

    const response = await request(server).get("/api/genres");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No Genres Found");
  });

  it("GET API /api/genres/:id should return 404 for non-existing genres", async () => {
    getGenreById.mockReturnValue(null);

    const response = await request(server).get("/api/genres/909");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No Genre Found");
  });
});
