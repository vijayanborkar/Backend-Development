let express = require("express");
let { book } = require("./models/book.model");
let { user } = require("./models/user.model");
let { like } = require("./models/like.model");
let { sequelize } = require("./lib/index");
let { Op } = require("@sequelize/core");

let app = express();
app.use(express.json());

// users
let users = [
  {
    username: "booklover",
    email: "booklover@gmail.com",
    password: "password123",
  },
];

// books
let books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    summary: "A novel about the serious issues of rape and racial inequality.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    summary:
      "A novel presenting a dystopian future under a totalitarian regime.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    year: 1851,
    summary:
      "The narrative of the sailor Ishmael and the obsessive quest of Ahab.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    summary:
      "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    summary: "A novel about the American dream and the roaring twenties.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await user.bulkCreate(users);
    await book.bulkCreate(books);
    res.status(200).json({ message: "Database Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// Exercise 1: Like a Book
async function likeBook(data) {
  let newLike = await like.create({
    userId: data.userId,
    bookId: data.bookId,
  });
  return { message: "Book Liked", newLike };
}

app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let bookId = parseInt(req.query.bookId);
    let response = await likeBook({ userId, bookId });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Dislike a Book
async function disLikeBook(data) {
  let destroyLike = await like.destroy({
    where: {
      userId: data.userId,
      bookId: data.bookId,
    },
  });
  if (destroyLike === 0) {
    return {};
  } else {
    return { message: "Book Disliked" };
  }
}

app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let bookId = parseInt(req.query.bookId);
    let response = await disLikeBook({ userId, bookId });
    if (!response.message) {
      return res.status(404).json({ message: "Liked Book Not Found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get All Liked Books
async function getAllLikedBooks(userId) {
  let bookIds = await like.findAll({
    where: { userId },
    attributes: ["bookId"],
  });
  let bookRecords = [];
  for (let i = 0; i < bookIds.length; i++) {
    bookRecords.push(bookIds[i].bookId);
  }
  let likedBooks = await book.findAll({
    where: { id: { [Op.in]: bookRecords } },
  });
  return { likedBooks };
}

app.get("/users/:id/likes", async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    let response = await getAllLikedBooks(userId);
    if (response.likedBooks.length === 0) {
      return res.status(404).json({ message: "No liked Books found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
