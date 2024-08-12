let express = require("express");
let app = express();
let port = 3000;

// Exercise 1: Remove All Unwatched Videos
let watchList = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
  },
];

function removeUnwatchedVideos(watchList) {
  return watchList.filter((video) => video.watched);
}

app.get("/watchlist/delete-unwatched", (req, res) => {
  let result = removeUnwatchedVideos(watchList);
  res.json(result);
});

// Exercise 2: Mark Video as Favorite by ID
let watchList1 = [
  {
    videoId: 1,
    title: "JavaScript Tutorial",
    watched: false,
    url: "https://youtu.be/shorturl1",
    isFavorite: false,
  },
  {
    videoId: 2,
    title: "Node.js Basics",
    watched: true,
    url: "https://youtu.be/shorturl2",
    isFavorite: false,
  },
  {
    videoId: 3,
    title: "React.js Guide",
    watched: false,
    url: "https://youtu.be/shorturl3",
    isFavorite: false,
  },
];

function markVideoAsFavoriteById(watchList, videoId, isFavorite) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchList[i].videoId === videoId) {
      watchList[i].isFavorite = isFavorite;
      break;
    }
  }
  return watchList;
}

app.get("/watchlist/favorite", (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let isFavorite = req.query.isFavorite === "true";
  let result = markVideoAsFavoriteById(watchList1, videoId, isFavorite);
  res.json(result);
});

// Example 3: Update Task Status by ID
let tasks = [
  { taskId: 1, title: "Buy groceries", completed: false },
  { taskId: 2, title: "Walk the dog", completed: false },
  { taskId: 3, title: "Do laundry", completed: true },
];

function updateTaskStatusById(tasks, taskId, completed) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].completed = completed;
      break;
    }
  }
  return tasks;
}

app.get("/tasks/update", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let completed = req.query.completed === "true";
  let result = updateTaskStatusById(tasks, taskId, completed);
  res.json(result);
});

// Example 4: Remove Completed Tasks
let tasks1 = [
  { taskId: 1, title: "Buy groceries", completed: false },
  { taskId: 2, title: "Walk the dog", completed: false },
  { taskId: 3, title: "Do laundry", completed: true },
];

function removeCompletedTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}

app.get("/tasks/remove-completed", (req, res) => {
  let result = removeCompletedTasks(tasks);
  res.json(result);
});

// Example 5: Update Library Book Availability by ID
let books = [
  { bookId: 1, title: "1984", available: true },
  { bookId: 2, title: "Brave New World", available: true },
  { bookId: 3, title: "Fahrenheit 451", available: false },
];

function updateBookAvailabilityById(books, bookId, available) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].bookId === bookId) {
      books[i].available = available;
      break;
    }
  }
  return books;
}

app.get("/library/update", (req, res) => {
  let bookId = parseInt(req.query.bookId);
  let available = req.query.available === "true";
  let result = updateBookAvailabilityById(books, bookId, available);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
