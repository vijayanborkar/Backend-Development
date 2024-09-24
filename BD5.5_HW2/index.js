let express = require("express");
let { movie } = require("./models/movie.model");
let { user } = require("./models/user.model");
let { like } = require("./models/like.model");
let { sequelize } = require("./lib/index");
let { Op } = require("@sequelize/core");

let app = express();
app.use(express.json());

// users
let users = [
  {
    username: "moviefan",
    email: "moviefan@gmail.com",
    password: "password123",
  },
];

// movies
let movies = [
  {
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2010,
    summary:
      "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: "Crime",
    year: 1972,
    summary:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    genre: "Crime",
    year: 1994,
    summary:
      "The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.",
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: "Action",
    year: 2008,
    summary:
      "When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    genre: "Drama",
    year: 1994,
    summary:
      "The presidencies of Kennedy and Johnson, the Vietnam War, and other events unfold from the perspective of an Alabama man with an IQ of 75.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await user.bulkCreate(users);
    await movie.bulkCreate(movies);
    res.status(200).json({ message: "Database Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// Exercise 1: Like a Movie
async function likeMovie(data) {
  let newLike = await like.create({
    userId: data.userId,
    movieId: data.movieId,
  });
  return { message: "Movie Liked", newLike };
}

app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let movieId = parseInt(req.query.movieId);
    let response = await likeMovie({ userId, movieId });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Dislike a Movie
async function disLikeMovie(data) {
  let destroyLike = await like.destroy({
    where: {
      userId: data.userId,
      movieId: data.movieId,
    },
  });
  if (destroyLike === 0) {
    return {};
  } else {
    return { message: "Movie Disliked" };
  }
}

app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let movieId = parseInt(req.query.movieId);
    let response = await disLikeMovie({ userId, movieId });
    if (!response.message) {
      return res.status(404).json({ message: "Liked Movie Not Found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get All Liked Movies
async function getAllLikedMovies(userId) {
  let movieIds = await like.findAll({
    where: { userId },
    attributes: ["movieId"],
  });
  let movieRecords = movieIds.map((like) => like.movieId);
  if (movieRecords === 0) {
    return { likedMovies: [] };
  }
  let likedMovies = await movie.findAll({
    where: { id: { [Op.in]: movieRecords } },
  });
  return { likedMovies };
}

app.get("/users/:id/liked", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let response = await getAllLikedMovies(userId);
    if (response.likedMovies.length === 0) {
      return res.status(404).json({ message: "No liked Movies found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
