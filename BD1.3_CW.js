let express = require("express");
let app = express();
let port = 3000;

// Question 1
app.get("/check-number", (req, res) => {
  let number = req.query.number;
  let result = "";
  if (number >= 0) {
    result = "positive";
  } else {
    result = "negative";
  }
  res.send("Number is " + result);
});

// Question 2
app.get("/check-even-odd", (req, res) => {
  let number = parseInt(req.query.number);
  let result = "";
  if (number % 2 === 0) {
    result = "even";
  } else {
    result = "odd";
  }
  res.send(result);
});

// Question 3
app.get("/check-login", (req, res) => {
  let isLoggedIn = req.query.isLogged === "true";
  let result = "";
  if ((isLoggedIn)) {
    result = "You are logged in";
  } else {
    result = "You are not logged in";
  }
  res.send(result);
});

// Question 4
app.get("/check-discount", (req, res) => {
  let age = req.query.age;
  let result = "";
  if (age > 65) {
    result = "You are eligible for a discount";
  } else {
    result = "You are not eligible for a discount";
  }
  res.send(result);
});

// Question 5
app.get("/check-number-type", (req, res) => {
  let number = req.query.number;
  let result = "";
  if (number > 0) {
    result = "positive";
  } else if (number < 0) {
    result = "negative";
  } else {
    result = "zero";
  }
  res.send(result);
});

// Question 6
app.get("/check-temperature", (req, res) => {
  let temperature = req.query.temperature;
  let result = "";
  if (temperature < 15) {
    result = "cold";
  } else if (temperature >= 15 && temperature <= 25) {
    result = "warm";
  } else {
    result = "hot";
  }
  res.send(result);
});

// Question 7
app.get("/check-activity-level", (req, res) => {
  let steps = req.query.steps;
  let result = "";
  if (steps < 5000) {
    result = "low";
  } else if (steps > 10000) {
    result = "high";
  } else {
    result = "moderate";
  }
  res.send(result);
});

// Question 8
app.get("/check-engagement", (req, res) => {
  let likes = req.query.likes;
  let result = "";
  if (likes < 100) {
    result = "low";
  } else if (likes > 500) {
    result = "high";
  } else {
    result = "medium";
  }
  res.send(result);
});

app.listen(port, () => {
  console.log("The app is listening of this port no 3000" + port);
});
