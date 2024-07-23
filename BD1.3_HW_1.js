let express = require("express");
let app = express();
let port = 3000;

// Question 1
app.get("/check-whole-number", (req, res) => {
  let number = parseFloat(req.query.number);
  let result;
  if (number >= 0) {
    result = "Number is whole number";
  } else {
    result = "Number is not whole";
  }
  res.send(result);
});

// Question 2
app.get("/check-equal", (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  let result;
  if (num1 === num2) {
    result = "Numbers are equal";
  } else {
    result = "Numbers are not equal";
  }
  res.send(result);
});

// Question 3
app.get("/check-active", (req, res) => {
  let isActive = req.query.isActive === "true";
  let result = "";
  if (isActive) {
    result = "User is active";
  } else {
    result = "User is not active";
  }
  res.send(result);
});

// Question 4
app.get("/check-discount", (req, res) => {
  let cost = parseFloat(req.query.cost);
  let result;
  if (cost > 1000) {
    result = "User is eligible for discount";
  } else {
    result = "User is not eligible for discount";
  }
  res.send(result);
});

// Question 5
app.get("/check-experience", (req, res) => {
  let workExperience = parseFloat(req.query.workExperience);
  let result;
  if (workExperience > 0) {
    result = "Person is experienced";
  } else if (workExperience < 0) {
    result = "Person is non-working";
  } else {
    result = "Person is a fresher";
  }
  res.send(result);
});

// Question 6
app.get("/check-result", (req, res) => {
  let result = parseFloat(req.query.result);
  let grade;
  if (result > 80) {
    grade = "A";
  } else if (result >= 50) {
    grade = "B";
  } else {
    grade = "Fail";
  }
  res.send("The grade is " + grade);
});

// Question 7
app.get("/check-attendance", (req, res) => {
  let attendance = parseInt(req.query.attendance);
  let result;
  if (attendance < 50) {
    result = "low";
  } else if (attendance <= 90) {
    result = "moderate";
  } else {
    result = "high";
  }
  res.send("Attendance is " + result);
});

// Question 8
app.get("/check-rating", (req, res) => {
  let stars = parseInt(req.query.stars);
  let result;
  if (stars < 3) {
    result = "low";
  } else if (stars <= 4) {
    result = "moderate";
  } else {
    result = "high";
  }
  res.send("Restaurant rating is " + result);
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
