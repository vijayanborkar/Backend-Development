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

// Exercise 5
const projects1 = [
  { name: "Project A", duration: 12, status: "completed" },
  { name: "Project B", duration: 8, status: "ongoing" },
  { name: "Project C", duration: 10, status: "ongoing" },
  { name: "Project D", duration: 6, status: "completed" },
];

let sortedProjects1 = projects1
  .filter((project) => project.status === "completed")
  .sort((a, b) => a.duration - b.duration);

console.log(sortedProjects1);

// Exercise 6
const projects2 = [
  { name: "Project A", duration: 12, status: "completed" },
  { name: "Project B", duration: 8, status: "ongoing" },
  { name: "Project C", duration: 10, status: "ongoing" },
  { name: "Project D", duration: 6, status: "completed" },
];

let sortedProjects2 = projects2.sort((a, b) => a.duration - b.duration);

console.log(sortedProjects2);

// Exercise 7
const gadgets = [
  { name: "iPhone", brand: "Apple", quantity: 2 },
  { name: "Galaxy S21", brand: "Samsung", quantity: 5 },
  { name: "iPad", brand: "Apple", quantity: 3 },
  { name: "Pixel 5", brand: "Google", quantity: 1 },
];

let sortedGadgets = gadgets
  .filter((gadget) => gadget.brand === "Apple")
  .sort((a, b) => (a.quantity = b.quantity));

console.log(sortedGadgets);

// Exercise 8
const products = [
  { name: "Laptop", price: 1000 },
  { name: "Smartphone", price: 800 },
  { name: "Tablet", price: 600 },
  { name: "Monitor", price: 300 },
  { name: "Keyboard", price: 100 },
];

let sortedProducts = products.sort((a, b) => a.price - b.price);

console.log(sortedProducts);

// Exercise 9
const cars = [
  { make: "Toyota", model: "Camry", year: 2015 },
  { make: "Honda", model: "Accord", year: 2008 },
  { make: "Tesla", model: "Model 3", year: 2020 },
  { make: "Ford", model: "Fusion", year: 2009 },
];

let sortedCars = cars.sort((a, b) => a.year - b.year);

console.log(sortedCars);

// Exercise 10
const athletes = [
  { name: "John", score: 85 },
  { name: "Mike", score: 92 },
  { name: "Sara", score: 88 },
  { name: "Linda", score: 95 },
];

let sortedAthletes = athletes
  .filter((athlet) => athlet.score > 90)
  .sort((a, b) => a.score - b.score);

console.log(sortedAthletes);

// Exercise 11
const students = [
  { name: "Alex", grade: "B", marks: 75 },
  { name: "Bella", grade: "A", marks: 90 },
  { name: "Chris", grade: "C", marks: 58 },
  { name: "Diana", grade: "A", marks: 80 },
];

let sortedStudents = students
  .filter((student) => student.grade === "A")
  .sort((a, b) => b.marks - a.marks);

console.log(sortedStudents);

// Exercise 12
const employees = [
  { name: "Raman", department: "Engineering", salary: 70000 },
  { name: "Samiksha", department: "Marketing", salary: 55000 },
  { name: "Ronak", department: "Engineering", salary: 80000 },
  { name: "Siddharth", department: "Sales", salary: 60000 },
];

let sortedEmployees = employees
  .filter((employee) => employee.department === "Engineering")
  .sort((a, b) => b.salary - a.salary);

console.log(sortedEmployees);

// Exercise 13
const employees1 = [
  { name: "Raman", department: "Engineering", salary: 70000 },
  { name: "Samiksha", department: "Marketing", salary: 55000 },
  { name: "Ronak", department: "Engineering", salary: 50000 },
  { name: "Kevin", department: "Marketing", salary: 50000 },
  { name: "Siddharth", department: "Sales", salary: 60000 },
];

let sortedEmployees1 = employees1
  .filter((employee) => employee.department === "Marketing")
  .sort((a, b) => a.salary - b.salary);

console.log(sortedEmployees1);

// Exercise 14
const employees2 = [
  { name: "Eve", department: "Engineering", salary: 70000 },
  { name: "Sam", department: "Marketing", salary: 55000 },
  { name: "John", department: "Engineering", salary: 80000 },
  { name: "Lucy", department: "Sales", salary: 60000 },
];

let sortedEmployees2 = employees2
  .filter((employee) => employee.salary > 60000)
  .sort((a, b) => b.salary - a.salary);

console.log(sortedEmployees2);

// Exercise 15
const employees3 = [
  { name: "Eve", department: "Engineering", salary: 70000 },
  { name: "Sam", department: "Marketing", salary: 55000 },
  { name: "John", department: "Engineering", salary: 80000 },
  { name: "Lucy", department: "Sales", salary: 60000 },
];

let sortedEmployees3 = employees3
  .filter((employee) => employee.salary < 70000)
  .sort((a, b) => a.salary - b.salary);

console.log(sortedEmployees3);
