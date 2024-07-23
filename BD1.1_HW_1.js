let express = require("express");
let app = express();
let port = 3000;

// Question 1
app.get("/whisper", (req, res) => {
  let name = req.query.name;
  let lowerCaseName = name.toLowerCase();
  res.send(lowerCaseName);
});

// Question 2
app.get("/full-product-name", (req, res) => {
  let companyName = req.query.companyName;
  let productName = req.query.productName;
  let fullProductName = companyName + " " + productName;
  res.send(fullProductName);
});

// Question 3
app.get("/date", (req, res) => {
  let month = req.query.month;
  let year = req.query.year;
  let formattedDate = month + "/" + year;
  res.send(formattedDate);
});

// Question 4
app.get("/greet", (req, res) => {
  let city = req.query.city;
  let greeting = "You live in " + city;
  res.send(greeting);
});

// Question 5
app.get("/capital", (req, res) => {
  let capital = req.query.capital;
  let country = req.query.country;
  let countryCapital = capital + " is the capital of " + country;
  res.send(countryCapital);
});

// Question 6
app.get("/email", (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let domain = req.query.domain;
  let email = firstName + "." + lastName + "@" + domain;
  res.send(email);
});

app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});
