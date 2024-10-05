let express = require("express");
let app = express();
let port = 3000;

// Question 1
app.get("/shout", (req, res) => {
  let name = req.query.name;
  let upperCaseName = name.toUpperCase();
  res.send(upperCaseName);
});

// Quesiton 2
app.get("/fullname", (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let fullname = firstName + " " + lastName;
  res.send(fullname);
});

// Question 3
app.get("/date", (req, res) => {
  let month = req.query.month;
  let year = req.query.year;
  let formattedDate = month + ", " + year;
  res.send(formattedDate);
});

// Question 4
app.get("/greet", (req, res) => {
  let name = req.query.name;
  let greeting = "Namaste, " + name + "!";
  res.send(greeting);
});

// Question 5
app.get("/address", (req, res) => {
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let address = street + ", " + city + ", " + state;
  res.send(address);
});

// Question 6
app.get("/email", (req, res) => {
  let username = req.query.username;
  let domain = req.query.domain;
  let email = username + "@" + domain;
  res.send(email);
});

app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});
