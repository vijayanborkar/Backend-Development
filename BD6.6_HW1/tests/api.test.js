const request = require("supertest");
const http = require("http");
const { getAllMovies, getMovieById } = require("../controllers");
const { app } = require("../index");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn(),
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
    let mockedMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockedMovies);
    let result = getAllMovies();
    expect(result).toEqual(mockedMovies);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoints tests", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("GET /movies should get all movies", async () => {
    let mockedMovies = [
      {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
      {
        movieId: 2,
        title: "The Shawshank Redemption",
        genre: "Drama",
        director: "Frank Darabont",
      },
      {
        movieId: 3,
        title: "The Godfather",
        genre: "Crime",
        director: "Francis Ford Coppola",
      },
    ];

    getAllMovies.mockReturnValue(mockedMovies);

    const res = await request(server).get("/movies");
    expect(res.status).toBE(200);
    expect(res.body.movies).toEqual(mockedMovies);
    expect(res.body.movies.length).toBe(3);
  });

  it("GET /movies/details/:id should get an movie by Id", async () => {
    let mockedMovie = {
      movieId: 1,
      title: "Inception",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
    };

    getMovieById.mockReturnValue(mockedMovie);

    const res = await request(server).get("/movies/details/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      movie: mockedMovie,
    });
  });
});
