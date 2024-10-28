// Exercise 1
const students = [
  { name: "Alice", age: 19, grade: "A" },
  { name: "Bob", age: 17, grade: "B" },
  { name: "Charlie", age: 20, grade: "C" },
  { name: "David", age: 18, grade: "B" },
];

const Exercise1 = students
  .filter((student) => student.age > 18)
  .map((student) => student.name);

console.log(Exercise1);

// Exercise 2
const products = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Phone", price: 500, category: "Electronics" },
  { name: "Book", price: 20, category: "Books" },
  { name: "Pen", price: 2, category: "Stationery" },
];

const Exercise2 = products.sort(
  (product1, product2) => product1.price - product2.price
);

console.log(Exercise2);

// Exercise 3
const employees = [
  { name: "John", department: "IT", salary: 60000 },
  { name: "Jane", department: "HR", salary: 50000 },
  { name: "Doe", department: "Finance", salary: 70000 },
  { name: "Smith", department: "HR", salary: 55000 },
];

const Exercise3 = employees.filter(
  (employees) => employees.department !== "HR"
);

console.log(Exercise3);

// Exercise 4
const books = [
  { title: "Book One", author: "Author A", year: 2005 },
  { title: "Book Two", author: "Author B", year: 1995 },
  { title: "Book Three", author: "Author C", year: 2010 },
  { title: "Book Four", author: "Author D", year: 1980 },
];

let Exercise4 = books.find((book) => book.year <= 2000);

console.log(Exercise4);

// Exercise 5
const cars = [
  { make: "Toyota", model: "Corolla", mileage: 50000 },
  { make: "Honda", model: "Civic", mileage: 30000 },
  { make: "Ford", model: "Mustang", mileage: 40000 },
  { make: "Tesla", model: "Model 3", mileage: 10000 },
];

function updateCarMileage(cars, make, newMileage) {
  const car = cars.find((car) => car.make === make);
  if (car) {
    car.mileage = newMileage;
    console.log(`The updated mileage for ${make} is ${newMileage}`);
  } else {
    console.log(`Car with make ${make} not found.`);
  }
}

updateCarMileage(cars, "Honda", 35000);

// Exercise 6
const sales = [
  { item: "Laptop", quantity: 2, price: 1000 },
  { item: "Phone", quantity: 5, price: 500 },
  { item: "Book", quantity: 10, price: 20 },
  { item: "Pen", quantity: 100, price: 2 },
];

let totalRevenue = 0;

for (let i = 0; i < sales.length; i++) {
  totalRevenue += sales[i].quantity * sales[i].price;
}

console.log(`Total revenue of sales is ${totalRevenue}`);

// Exercise 7
const movies = [
  { title: "Movie One", director: "Director A", rating: 8 },
  { title: "Movie Two", director: "Director B", rating: 7 },
  { title: "Movie Three", director: "Director A", rating: 9 },
  { title: "Movie Four", director: "Director C", rating: 6 },
];

const directorMovies = movies.filter(
  (movie) => movie.director === "Director A"
);

directorMovies.forEach((movie) => {
  console.log(`Title: ${movie.title}\nDirector: ${movie.director}\n`);
});

// Exercise 8
const cricketers = [
  {
    name: "Virat",
    eden_gardens: 72,
    wankhede_stadium: 88,
    feroz_shah_kotla: 45,
    chepauk: 74,
  },
  {
    name: "Rohit",
    eden_gardens: 64,
    wankhede_stadium: 41,
    feroz_shah_kotla: 68,
    chepauk: 34,
  },
  {
    name: "Shikhar",
    eden_gardens: 54,
    wankhede_stadium: 38,
    feroz_shah_kotla: 72,
    chepauk: 44,
  },
  {
    name: "Rishabh",
    eden_gardens: 22,
    wankhede_stadium: 27,
    feroz_shah_kotla: 34,
    chepauk: 51,
  },
];

for (let i = 0; i < cricketers.length; i++) {
  const batsman = `${cricketers[i].name}`;
  console.log(`Scores of ${batsman}`);
  console.log(`Eden Gardens: ${cricketers[i].eden_gardens}`);
  console.log(`Wankhede Stadium: ${cricketers[i].wankhede_stadium}`);
  console.log(`M. Chinnaswamy Stadium: ${cricketers[i].feroz_shah_kotla}`);
  console.log(`Chepauk: ${cricketers[i].chepauk}\n`);
}
