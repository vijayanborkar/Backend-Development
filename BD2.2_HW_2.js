let express = require("express");
let app = express();
let port = 3000;

// Exercise 1
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function filterPrimeNumber(num) {
  return isPrime(num);
}

app.get("/prime-numbers", (req, res) => {
  let result = numbers.filter((num) => filterPrimeNumber(num));
  res.json(result);
});

// Exercise 2:
numbers = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filterPositiveNumbers(num) {
  return num > 0;
}

app.get("/positive-numbers", (req, res) => {
  let result = numbers.filter((num) => filterPositiveNumbers(num));
  res.json(result);
});

// Exercise 3:
numbers = [-10, -5, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filterNegativeNumbers(num) {
  return num < 0;
}

app.get("/negative-numbers", (req, res) => {
  let result = numbers.filter((num) => filterNegativeNumbers(num));
  res.json(result);
});

// Exercise 4:
numbers = [1, 3, 5, 7, 9];

function filterOddNumbers(num) {
  return num % 2 !== 0;
}

app.get("/odd-numbers", (req, res) => {
  let result = numbers.filter((num) => filterOddNumbers(num));
  res.json(result);
});

// Exercise 5:
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filterNumbersGreaterThanValue(num, value) {
  return num > value;
}

app.get("/numbers-greater-than", (req, res) => {
  let value = parseInt(req.query.value);
  let result = numbers.filter((num) =>
    filterNumbersGreaterThanValue(num, value),
  );
  res.json(result);
});

// Exercise 6:
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filterNumbersLessThanValue(num, value) {
  return num < value;
}

app.get("/numbers-less-than", (req, res) => {
  let value = parseInt(req.query.value);
  let result = numbers.filter((num) => filterNumbersLessThanValue(num, value));
  res.json(result);
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
