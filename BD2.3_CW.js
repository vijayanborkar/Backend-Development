let express = require("express");
let app = express();
let port = 3000;

// Question 1:
let products = [
  { name: "Laptop", price: 50000, category: "Electronics" },
  { name: "Mobile", price: 20000, category: "Electronics" },
  { name: "Shirt", price: 1500, category: "Apparel" },
  { name: "Mixer Grinder", price: 4000, category: "Home Appliances" },
];

function filterByCategory(product, category) {
  return product.category === category;
}

app.get("/products/category/:category", (req, res) => {
  let category = req.params.category;
  let results = products.filter((product) =>
    filterByCategory(product, category),
  );
  res.json(results);
});

// Question 2:
let cars = [
  { make: "Maruti", model: "Swift", mileage: 15000 },
  { make: "Hyundai", model: "i20", mileage: 25000 },
  { make: "Tata", model: "Nexon", mileage: 30000 },
];

function filterByMileage(car, maxMileage) {
  return car.mileage < maxMileage;
}

app.get("/cars/mileage/:maxMileage", (req, res) => {
  let maxMileage = parseInt(req.params.maxMileage);
  let result = cars.filter((car) => filterByMileage(car, maxMileage));
  res.json(result);
});

// Questions 3:
let movies = [
  { title: "3 Idiots", genre: "Comedy", rating: 9 },
  { title: "Dangal", genre: "Drama", rating: 10 },
  { title: "Bahubali", genre: "Action", rating: 8 },
];

function filterByRating(movie, minRating) {
  return movie.rating > minRating;
}

app.get("/movies/rating/:minRating", (req, res) => {
  let minRating = parseInt(req.params.minRating);
  let result = movies.filter((movie) => filterByRating(movie, minRating));
  res.json(result);
});

// Question 4:
let orders = [
  { orderId: 1, customerName: "Rahul", status: "shipped" },
  { orderId: 2, customerName: "Sita", status: "pending" },
  { orderId: 3, customerName: "Amit", status: "shipped" },
];

function filterByStatus(order, status) {
  return order.status === status;
}

app.get("/orders/status/:status", (req, res) => {
  let status = req.params.status;
  let result = orders.filter((order) => filterByStatus(order, status));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
