// Exercise 1
let numbers = [2, 4, 6, 10, 5];

let doubleNumbers = [];
for (i = 0; i < numbers.length; i++) {
  doubleNumbers.push(numbers[i] * 2);
}

console.log(doubleNumbers);

// Exercise 2
const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob", grade: "B" },
  { name: "Charlie", grade: "A" },
  { name: "David", grade: "C" },
];

let gradeA = [];
for (i = 0; i < students.length; i++) {
  if (students[i].grade === "A") {
    gradeA.push(students[i].name);
  }
}

console.log(gradeA);

// Exercise 3
const prices = [99, 150, 75, 120, 200];

let pricesGreaterThan100 = [];
for (i = 0; i < prices.length; i++) {
  if (prices[i] > 100) {
    pricesGreaterThan100.push(prices[i]);
  }
}

console.log(pricesGreaterThan100);

// Exercise 4
const ages = [12, 15, 22, 29, 34];

let newAges = [];
for (i = 0; i < ages.length; i++) {
  if (ages[i] % 2 === 0) {
    newAges.push(ages[i]);
  }
}

console.log(newAges);

// Exercise 5
const sports = ["Soccer", "Basketball", "Tennis"];

let newSports = [];
for (i = 0; i < sports.length; i++) {
  newSports.push(sports[i] + "?");
}

console.log(newSports);

// Exercise 6
const numbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let newNumbers1 = [];
for (let i = 0; i < numbers1.length; i++) {
  if (numbers1[i] % 2 == 0) {
    newNumbers1.push(numbers1[i]);
  }
}

console.log(newNumbers1);

// Exercise 7
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let newNumbers2 = [];
for (let i = 0; i < numbers2.length; i++) {
  if (numbers2[i] % 2 != 0) {
    newNumbers2.push(numbers2[i]);
  }
}

console.log(newNumbers2);

// Exercise 8
const names = ["John", "Doe", "Jane", "Smith"];

let concatenatedNames = [];
for (let i = 0; i < names.length; i++) {
  if (i === names.length - 1) {
    concatenatedNames = concatenatedNames + names[i];
  } else {
    concatenatedNames = concatenatedNames + names[i] + "-";
  }
}

console.log(concatenatedNames);

// Exercise 9
const strings = ["Hello", "world", "from", "practice", "set"];

let combinedString = [];
for (let i = 0; i < strings.length; i++) {
  if (i === strings.length - 1) {
    combinedString = combinedString + strings[i];
  } else {
    combinedString = combinedString + strings[i] + " ";
  }
}

console.log(combinedString);

// Exercise 10
const strings1 = ["apple", "banana", "cherry"];

let comaString = [];
for (let i = 0; i < strings1.length; i++) {
  if (i === strings1.length - 1) {
    comaString = comaString + strings1[i];
  } else {
    comaString = comaString + strings1[i] + ",";
  }
}

console.log(comaString);

// Exercise 11
const cars = [
  { make: "Toyota", model: "Camry", year: 2015 },
  { make: "Honda", model: "Accord", year: 2008 },
  { make: "Tesla", model: "Model 3", year: 2020 },
  { make: "Ford", model: "Fusion", year: 2009 },
];

let filteredCars = [];
for (let i = 0; i < cars.length; i++) {
  if (cars[i].year > 2010) {
    filteredCars.push(cars[i]);
  }
}

console.log(filteredCars);

// Exercise 12
const temperatures = [0, 20, 37, 100];

let convertedTemp = [];
for (let i = 0; i < temperatures.length; i++) {
  let fahrenheit = (temperatures[i] * 9) / 5 + 32;
  convertedTemp.push(fahrenheit);
}

console.log(convertedTemp);

// Exercise 13
const scores = [10, 22, 25, 33, 40, 55];

let newScores = [];
for (let i = 0; i < scores.length; i++) {
  if (scores[i] % 5 === 0) {
    newScores.push(scores[i]);
  }
}

console.log(newScores);

// Exercise 14
const events = [
  { title: "Concert", date: "2022-08-10", location: "New York" },
  { title: "Art Exhibition", date: "2022-09-12", location: "Los Angeles" },
  { title: "Tech Conference", date: "2022-10-05", location: "New York" },
];

let newYorkEvents = [];
for (let i = 0; i < events.length; i++) {
  if (events[i].location === "New York") {
    newYorkEvents.push(events[i].title);
  }
}

console.log(newYorkEvents);

// Exercise 15
const ages1 = [20, 25, 30, 35];

let newAges1 = [];
for (let i = 0; i < ages1.length; i++) {
  newAges1.push(ages1[i] + 10);
}

console.log(newAges1);
