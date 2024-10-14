let { app, getMovies, getMovieById, addMovie } = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getMovies: jest.fn(),
  getMovieById: jest.fn(),
  addMovie: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3003, done);
});

afterAll((done) => {
  server.close(done);
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Function Tests", () => {
  // Exercise 4: Test get all movies
  test("getMovies should return a list of movies", () => {
    const mockMovies = [
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
    ];

    getMovies.mockReturnValue(mockMovies);

    let result = getMovies();

    expect(result).toEqual(mockMovies);
    expect(getMovies).toHaveBeenCalled();
  });

  // Exercise 5: Test get movie by ID
  test("getMovieById should return movie details", () => {
    const mockMovies = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    };

    getMovieById.mockReturnValue(mockMovies);

    let result = getMovieById(1);

    expect(result).toEqual(mockMovies);
    expect(getMovieById).toHaveBeenCalledWith(1);
  });

  // Exercise 6: Test get movie by non-existent ID
  test("getMovieById should return undefined if movie is not found", () => {
    getMovieById.mockReturnValue(undefined);

    let result = getMovieById(999);

    expect(result).toBeUndefined();
    expect(getMovieById).toHaveBeenCalledWith(999);
  });

  // Exercise 7: Test add new movie
  test("addMovie should add a new movie", () => {
    const newMovie = {
      movieId: 4,
      title: "Inception",
      director: "Christopher Nolan",
    };

    addMovie.mockReturnValue(newMovie);

    let result = addMovie(newMovie);

    expect(result).toEqual(newMovie);
    expect(addMovie).toHaveBeenCalledWith(newMovie);
  });
});
