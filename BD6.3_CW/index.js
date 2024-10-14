const express = require("express");
const app = express();
app.use(express.json());

let reviews = [
  { id: 1, content: "Great product!", userId: 1 },
  { id: 2, content: "Not bad, could be better.", userId: 2 },
];

let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

async function getAllReviews() {
  return reviews;
}

async function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

async function addReview(data) {
  data.id = reviews.length + 1;
  reviews.push(data);
  return data;
}

async function getUserById(id) {
  return users.find((user) => user.id === id);
}

async function addUser(user) {
  user.id = users.length + 1;
  users.push(user);
  return user;
}

// Get all reviews
app.get("/reviews", async (req, res) => {
  let reviews = await getAllReviews();
  res.json(reviews);
});

// Get a review by Id
app.get("/reviews/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let review = await getReviewById(id);
  if (!review) {
    return res.status(404).send("Review not found");
  } else {
    return res.json(review);
  }
});

// Add a new review
app.post("/reviews/new", async (req, res) => {
  let newReview = await addReview(req.body);
  res.status(201).json(newReview);
});

// Get a user by Id
app.get("/users/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let user = await getUserById(id);
  if (!user) {
    return res.status(404).send("User is not found");
  } else {
    return res.json(user);
  }
});

// Add a new user
app.post("/users/new", async (req, res) => {
  let newUser = await addUser(req.body);
  res.status(201).json(newUser);
});

module.exports = {
  app,
  getAllReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
};
