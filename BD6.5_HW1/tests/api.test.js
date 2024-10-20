const request = require("supertest");
const { app, validateGame, validateTournament } = require("../index.js");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints to add data", () => {
  it("should add a new game with valid input", async () => {
    const res = await request(server).post("/api/games").send({
      title: "The Legend of Zelda",
      genre: "Adventure",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      title: "The Legend of Zelda",
      genre: "Adventure",
    });
  });

  it("should return 400 from invalid game input", async () => {
    const res = await request(server)
      .post("/api/games")
      .send({ title: "The Legend of Zelda" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Genre is required and should be a string.");
  });

  it("should add a new tournament with valid input", async () => {
    const res = await request(server).post("/api/tournaments").send({
      name: "Zelda Championship",
      gameId: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "Zelda Championship",
      gameId: 1,
    });
  });

  it("should return 400 from invalid tournament input", async () => {
    const res = await request(server)
      .post("/api/tournaments")
      .send({ name: "Zelda Championship" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("GameId is required and should be a string.");
  });
});

describe("Validation Functions", () => {
  it("should validate game input correctly", () => {
    expect(
      validateGame({ title: "The Legend of Zelda", genre: "Adventure" })
    ).toBeNull();

    expect(validateGame({ title: "The Legend of Zelda" })).toEqual(
      "Genre is required and should be a string."
    );
    expect(validateGame({ genre: "Adventure" })).toEqual(
      "Title is required and should be a string."
    );
  });

  it("should validate tournament input correctly", () => {
    expect(
      validateTournament({ name: "Zelda Championship", gameId: 1 })
    ).toBeNull();

    expect(validateTournament({ name: "Zelda Championship" })).toEqual(
      "GameId is required and should be a string."
    );
    expect(validateTournament({ gameId: 1 })).toEqual(
      "Name is required and should be a string."
    );
  });
});
