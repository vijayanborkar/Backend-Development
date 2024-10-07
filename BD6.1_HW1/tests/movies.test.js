let { getMovies, getMovieById, addMovie } = require("../movie");

// Exercise 4: Test get all movies
describe("Movies Function", () => {
  it("Should get all movies", () => {
    let movies = getMovies();
    expect(movies.length).toBe(4);
    expect(movies).toEqual([
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
      { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
      { id: 4, title: "Pulp Fiction", director: "Quentin Tarantino" },
    ]);
  });

  // Exercise 5: Test get movie by ID
  it("Should return a movie by id", () => {
    let movie = getMovieById(1);
    expect(movie).toEqual({
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    });
  });

  // Exercise 6: Test get movie by non-existent ID
  it("Should return undefined for a non-existant movie", () => {
    let movie = getMovieById(99);
    expect(movie).toBeUndefined();
  });

  // Exercise 7: Test add new movie
  it("Should add a new movie", () => {
    let newMovie = { title: "New Movie", director: "Director Name" };
    let addedMovie = addMovie(newMovie);
    expect(addedMovie).toEqual({
      id: 5,
      title: "New Movie",
      director: "Director Name",
    });
    const movies = getMovies();
    expect(movies.length).toBe(5);
  });
});
