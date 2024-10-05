let express = require("express");
let app = express();
let port = 3000;

// Question 1
app.get("/bmi", (req, res) => {
  let height = parseFloat(req.query.height);
  let weight = parseFloat(req.query.weight);
  let bmi = weight / (height * height);
  res.send(bmi.toString());
});

// Question 2
app.get("/checkout", (req, res) => {
  let product = req.query.product;
  let units = parseFloat(req.query.units);
  let price = parseFloat(req.query.price);
  let total_price = "Your total for 2 " + product + " is " + units * price;
  res.send(total_price.toString());
});

// Question 3
app.get("/grade", (req, res) => {
  let maths = parseInt(req.query.maths);
  let science = parseInt(req.query.science);
  let english = parseInt(req.query.english);
  let gradeInPercentage = parseInt(((maths + science + english) / 300) * 100);
  res.send("Your grade in percentage is " + gradeInPercentage + "%");
});

// Question 4
app.get("/discounted-price", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let discount = parseFloat(req.query.discount);
  let discountedPrice = cartTotal - cartTotal * (discount / 100);
  res.send("Your bill amount is " + discountedPrice);
});

// Question 5
app.get("/split-bill", (req, res) => {
  let billAmount = parseFloat(req.query.billAmount);
  let numberOfFriends = parseFloat(req.query.numberOfFriends);
  let splitBill = billAmount / numberOfFriends;
  res.send("Each friend owes ₹" + splitBill + " against the bill");
});

// Question 6
app.get("/celsius-to-fahrenheit", (req, res) => {
  let temperature = parseFloat(req.query.temperature);
  let fahrenheit = (temperature * 9 / 5 + 32);
  res.send("Result: " + fahrenheit + " Fahrenheit");
})

// Question 7
app.get("/monthly-salary", (req, res) => {
  let totalHours = parseFloat(req.query.totalHours);
  let hourlyWage = parseFloat(req.query.hourlyWage);
  let monthlySalary = totalHours * hourlyWage;
  res.send("Your monthly salary is ₹" + monthlySalary);
})

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
