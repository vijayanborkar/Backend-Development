// Exercise 1
let numbers = [2, 5, 10, 6, 4];

let sortedNumbers = numbers.sort((a, b) => a - b);

console.log(sortedNumbers);

// Exercise 2
const ages = [32, 21, 45, 29, 39];

let sortedAges = ages.sort((a, b) => b - a);

console.log(sortedAges);

// Exercise 3
const prices = [99, 150, 75, 120, 200];

let sortedPrices = prices.sort((a, b) => b - a);

console.log(sortedPrices);

// Exercise 4
const projects = [
  { name: "Project A", duration: 12, status: "completed" },
  { name: "Project B", duration: 8, status: "ongoing" },
  { name: "Project C", duration: 10, status: "ongoing" },
  { name: "Project D", duration: 6, status: "completed" },
];

let sortedProjects = projects
  .filter((project) => project.status === "ongoing")
  .sort((a, b) => a.duration - b.duration);

console.log(sortedProjects);
