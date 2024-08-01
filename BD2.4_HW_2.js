let express = require("express");
let app = express();
let port = 3000;

// Exercise 1:
let books = [
  { title: "Moby Jonas", author: "Herman Melville", publication_year: 2023 },
  { title: "1984", author: "George Orwell", publication_year: 1984 },
  {
    title: "A Tale of Two Cities",
    author: "Charles Jonas",
    publication_year: 2000,
  },
];

function sortBooksByYearInAscending(book1, book2) {
  return book1.publication_year - book2.publication_year;
}

app.get("/books/sort-by-year", (req, res) => {
  let booksCopy = books.slice();
  booksCopy.sort(sortBooksByYearInAscending);
  res.json(booksCopy);
});

// Exercise 2:
let employees = [
  { name: "John", salary: 75000 },
  { name: "Doe", salary: 30000 },
  { name: "Jane", salary: 50000 },
];

function sortEmployeesBySalaryInDescending(employee1, employee2) {
  return employee2.salary - employee1.salary;
}

app.get("/employees/sort-by-salary", (req, res) => {
  let employeesCopy = employees.slice();
  employeesCopy.sort(sortEmployeesBySalaryInDescending);
  res.json(employeesCopy);
});

// Exercise 3:
let products = [
  { name: "Product A", price: 15 },
  { name: "Product B", price: 25 },
  { name: "Product C", price: 10 },
];

function sortProductsByPriceAscending(product1, product2) {
  return product1.price - product2.price;
}

app.get("/products/sort-by-price", (req, res) => {
  let productsCopy = products.slice();
  productsCopy.sort(sortProductsByPriceAscending);
  res.json(productsCopy);
});

// Exercise 4:
let movies = [
  { title: "Movie A", rating: 9.0 },
  { title: "Movie B", rating: 7.0 },
  { title: "Movie C", rating: 8.5 },
];

function sortMoviesByRatingInDescending(movie1, movie2) {
  return movie2.rating - movie1.rating;
}

app.get("/movies/sort-by-rating", (req, res) => {
  let moviesCopy = movies.slice();
  moviesCopy.sort(sortMoviesByRatingInDescending);
  res.json(moviesCopy);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
