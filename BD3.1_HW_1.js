let express = require("express");
let app = express();
let port = 3000;

let numbers = [1, 2, 3, 4, 5];

let strings = ["hello", "world", "javascript", "node"];

// Exercise 1: Multiply All Numbers in an Array
function multiplyArray(numArray, multiplier) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numArray[i] * multiplier);
  }
  return result;
}

app.get("/numbers/multiply", (req, res) => {
  let multiplier = req.query.multiplier;
  let result = multiplyArray(numbers, multiplier);
  res.json({ result });
});

// Exercise 2: Concatenate Strings
function concatenateStrings(strArray, suffix) {
  let result = [];
  for (let i = 0; i < strings.length; i++) {
    result.push(strArray[i] + suffix);
  }
  return result;
}

app.get("/strings/concat", (req, res) => {
  let suffix = req.query.suffix;
  let result = concatenateStrings(strings, suffix);
  res.json({ result });
});

// Exercise 3: Remove All Odd Numbers from an Array
function removeOddNumbers(numArray) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numArray[i] % 2 === 0) result.push(numArray[i]);
  }
  return result;
}

app.get("/numbers/remove-odds", (req, res) => {
  let result = removeOddNumbers(numbers);
  res.json({ result });
});

// Exercise 4: Join All Strings in an Array
function joinStrings(strArray) {
  let result = [];
  for (let i = 0; i < strings.length; i++) {
    result = result + " " + strArray[i];
  }
  return result;
}

app.get("/strings/join", (req, res) => {
  let result = joinStrings(strings);
  res.json({ result });
});

// Exercise 5: Double All Numbers in an Array
function doubleNumbers(numArray) {
  let result = [];
  for (let i = 0; i < numbers.length; i++) {
    result.push(numArray[i] * 2);
  }
  return result;
}

app.get("/numbers/double", (req, res) => {
  let result = doubleNumbers(numbers);
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
