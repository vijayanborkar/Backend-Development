let express = require("express");
let app = express();
let port = 3000;

// Question 1:
let heights = [160, 175, 180, 165, 170];

function sortHeightsInAscendingOrder(height1, height2) {
  return height1 - height2;
}

app.get("/heights/sort-ascending", (req, res) => {
  let heightsCopy = heights.slice();
  heightsCopy.sort(sortHeightsInAscendingOrder);
  res.json(heightsCopy);
});

// Question 2:
let heights2 = [160, 175, 180, 165, 170];

function sortHeightsInDescendingOrder(height1, height2) {
  return height2 - height1;
}

app.get("/heights/sort-descending", (req, res) => {
  let heights2Copy = heights2.slice();
  heights2Copy.sort(sortHeightsInDescendingOrder);
  res.json(heights2Copy);
});

// Question 3:
let employee = [
  { name: "Rahul", employeeId: 101, salary: 50000 },
  { name: "Sita", employeeId: 102, salary: 60000 },
  { name: "Amit", employeeId: 103, salary: 45000 },
];

function sortEmployeeBySalaryInDescendingOrder(employee1, employee2) {
  return employee2.salary - employee1.salary;
}

app.get("/employees/sort-by-salary-descending", (req, res) => {
  let employeeCopy = employee.slice();
  employeeCopy.sort(sortEmployeeBySalaryInDescendingOrder);
  res.json(employeeCopy);
});

// Question 4:
let books = [
  { title: "The God of Small Things", author: "Arundhati Roy", pages: 340 },
  { title: "The White Tiger", author: "Aravind Adiga", pages: 321 },
  { title: "The Palace of Illusions", author: "Chitra Banerjee", pages: 360 },
];

function sortBooksByPagesAscending(book1, book2) {
  return book1.pages - book2.pages;
}

app.get("/books/sort-by-pages-ascending", (req, res) => {
  let booksCopy = books.slice();
  booksCopy.sort(sortBooksByPagesAscending);
  res.json(booksCopy);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
