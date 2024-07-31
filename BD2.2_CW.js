let express = require("express");
let app = express();
let port = 3000;

// Question 1:
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filterEvenNumbers(numbers) {
  return numbers.filter((number) => number % 2 === 0);
}

app.get("/even-numbers", (req, res) => {
  let result = filterEvenNumbers(numbers);
  res.json(result);
});

// Question 2:
let ages = [10, 20, 30, 15, 17, 25];

function filterAge(ages) {
  return ages.filter((age) => age > 18);
}

app.get("/adult-ages", (req, res) => {
  let result = filterAge(ages);
  res.json(result);
});

// Question 3:
let words = ["apple", "banana", "cherry", "date", "fig", "grape"];

function filterLongWords(words) {
  return words.filter((word) => word.length > 5);
}

app.get("/long-words", (req, res) => {
  let result = filterLongWords(words);
  res.json(result);
});

// Question 4:
let fileSizes = [50, 200, 75, 120, 30, 90, 150];

function filterSmallFiles(fileSizes, filterParam) {
  return fileSizes < filterParam;
}

app.get("/small-files", (req, res) => {
  let filterParam = parseFloat(req.query.filterParam);
  let result = fileSizes.filter((fileSizes) =>
    filterSmallFiles(fileSizes, filterParam),
  );
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
