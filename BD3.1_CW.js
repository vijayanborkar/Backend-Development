let express = require("express");
let app = express();
let port = 3000;

let numbers = [1, 2, 3, 4, 5];

let strings = ["hello", "world", "javascript", "node"];

// Question 1: Add a Number to an Array of Numbers
function addNumber(numbers, num) {
  numbers.push(num);
  return numbers;
}

app.get("/numbers/add", (req, res) => {
  let result = addNumber(numbers, 6);
  res.json(result);
});

// Question 2: Add a String to an Array of Strings
function addString(strings, str) {
  strings.push(str);
  return strings;
}

app.get("/strings/add", (req, res) => {
  let result = addString(strings, "express");
  res.json(result);
});

// Question 3 : Sum an Array of Numbers Using for Loop
function sumNumbers(numArray) {
  let sum = 0;
  for (let i = 0; i < numArray.length; i++) {
    sum = sum + numArray[i];
  }
  return sum;
}

app.get("/numbers/sum", (req, res) => {
  let result = sumNumbers(numbers);
  res.json({ sum: result });
});

// Question 4 : Find the Maximum Number in an Array
function findMax(numArray) {
  let max = numArray[0];
  for (let i = 1; i < numArray.length; i++) {
    if (numArray[i] > max) {
      max = numArray[i];
    }
  }
  return max;
}

app.get("/numbers/max", (req, res) => {
  let result = findMax(numbers);
  res.json({ max: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
