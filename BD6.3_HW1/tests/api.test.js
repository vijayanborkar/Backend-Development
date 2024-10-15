const request = require("supertest");
let {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper,
} = require("../index");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addDeveloper: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3006, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all games", async () => {
    const mockGames = [
      {
        id: 1,
        title: "The Legend of Zelda",
        genre: "Adventure",
        developer: "Nintendo",
      },
      {
        id: 2,
        title: "Super Mario Bros",
        genre: "Platformer",
        developer: "Nintendo",
      },
    ];

    getAllGames.mockResolvedValue(mockGames);

    const result = await request(server).get("/games");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGames);
  });

  it("should retrieve a specific game by id", async () => {
    const mockGames = {
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
      developer: "Nintendo",
    };
    getGameById.mockResolvedValue(mockGames);

    const result = await request(server).get("/games/details/1");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGames);
  });

  it("should return 404 for a non-existing game", async () => {
    getGameById.mockResolvedValue(null);

    const result = await request(server).get("/games/details/999");

    expect(result.statusCode).toEqual(404);
  });

  it("should add a new game", async () => {
    const mockGames = {
      id: 3,
      title: "Half-Life",
      genre: "FPS",
      developer: "Valve",
    };
    addGame.mockResolvedValue(mockGames);

    const result = await request(server)
      .post("/games/new")
      .send({ title: "Half-Life", genre: "FPS", developer: "Valve" });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(mockGames);
  });

  it("should retrieve a developer by Id", async () => {
    const mockDevelopers = { id: 1, name: "Nintendo", country: "Japan" };
    getDeveloperById.mockResolvedValue(mockDevelopers);

    const result = await request(server).get("/developers/details/1");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockDevelopers);
  });

  it("should return 404 for a non-existing developer", async () => {
    getDeveloperById.mockResolvedValue(null);

    const result = await request(server).get("/developers/details/999");

    expect(result.statusCode).toEqual(404);
  });

  it("should add a new developer", async () => {
    const mockDevelopers = { id: 2, name: "Epic Games", country: "USA" };
    addDeveloper.mockResolvedValue(mockDevelopers);

    const result = await request(server).post("/developers/new").send({
      name: "Epic Games",
      country: "USA",
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(mockDevelopers);
  });
});
