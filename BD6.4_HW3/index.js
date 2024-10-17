let {
  getAllArticles,
  getArticleById,
  getAllComments,
  getCommentById,
  getUserById,
} = require("./article.js");
const express = require("express");
const app = express();
app.use(express.json());

// Exercise 1: Get All Articles
app.get("/articles", async (req, res) => {
  try {
    const articles = await getAllArticles();
    if (articles.length === 0) {
      return res.status(404).json({ error: "No Articles Found" });
    }
    return res.json(articles);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 2 : Get Article by ID
app.get("/articles/:id", async (req, res) => {
  try {
    const article = await getArticleById(parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({ error: "No Article Found" });
    }
    return res.json(article);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 3 : Get All Comments
app.get("/comments", async (req, res) => {
  try {
    const comments = await getAllComments();
    if (comments.length === 0) {
      return res.status(404).json({ error: "No Comments Found" });
    }
    return res.json(comments);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 4 : Get Comment by ID
app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await getCommentById(parseInt(req.params.id));
    if (!comment) {
      return res.status(404).json({ error: "No Comment Found" });
    }
    return res.json(comment);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 5 : Get User by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ error: "No User Found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
