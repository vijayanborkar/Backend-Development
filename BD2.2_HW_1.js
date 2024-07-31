let express = require("express");
let app = express();
let port = 3000;

// Question 1
let temperatures = [22, 26, 19, 30, 23, 28, 17, 31];

function filterHighTemperatures(temperatures) {
  return temperatures.filter((temperatures) => temperatures > 25);
}

app.get("/high-temperatures", (req, res) => {
  let result = filterHighTemperatures(temperatures);
  res.json(result);
});

// Question 2
let rupees = [80, 120, 95, 150, 60, 110];

function filterRupees(rupees) {
  return rupees.filter((rupees) => rupees <= 100);
}

app.get("/low-prices", (req, res) => {
  let result = filterRupees(rupees);
  res.json(result);
});

// Question 3
let productRatings = [4.2, 3.8, 2.5, 4.7, 3.0, 4.9, 3.6];

function filterProductRatings(productRatings) {
  return productRatings.filter((productRatings) => productRatings > 3.5);
}

app.get("/high-ratings", (req, res) => {
  let result = filterProductRatings(productRatings);
  res.json(result);
});

// Question 4
let names = ["Akshay", "Priyanka", "Arjun", "Anushka", "Rajesh", "Kavita"];

function filterNamesLongerThan6Chracters(names) {
  return names.filter((names) => names.length > 6);
}

app.get("/long-indian-names", (req, res) => {
  let result = filterNamesLongerThan6Chracters(names);
  res.json(result);
});

// Question 5
let price = [10, 25, 50, 75, 100, 150, 200];

function filterPrice(price, filterParam) {
  return price.filter((price) => price < filterParam);
}

app.get("/cheaper-products", (req, res) => {
  let filterParam = parseFloat(req.query.filterParam);
  let result = filterPrice(price, filterParam);
  res.json(result);
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
