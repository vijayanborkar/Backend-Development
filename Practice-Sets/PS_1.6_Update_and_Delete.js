const { application } = require("express");

// Exercise 1
let students = [
  { id: 1, name: "John", grade: "B" },
  { id: 2, name: "Emily", grade: "C" },
  { id: 3, name: "David", grade: "A" },
];

let updatedStudent = students.map((student) => {
  if (student.id === 2) {
    return { ...student, grade: "A" };
  }
  return student;
});

console.log(updatedStudent);

// Exercise 2
let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Monitor", price: 300 },
  { id: 3, name: "Keyboard", price: 100 },
];

let updatedProducts = products.filter((product) => product.id !== 3);

console.log(updatedProducts);

// Exercise 3
let employees = [
  { id: 1, name: "John", department: "Engineering" },
  { id: 2, name: "Eve", department: "Sales" },
  { id: 3, name: "Mark", department: "Marketing" },
];

let updatedEmployees = employees.map((employee) => {
  if (employee.id === 1) {
    return { ...employee, department: "Human Resources" };
  } else {
    return employee;
  }
});

console.log(updatedEmployees);

// Exercise 4
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

let deletedBooks = books.filter((book) => book.id !== 2);

console.log(deletedBooks);

// Exercise 5
let cars = [
  { id: 1, make: "Toyota", year: 2015 },
  { id: 2, make: "Honda", year: 2008 },
  { id: 3, make: "Tesla", year: 2020 },
];

let updatedCars = cars.map((car) => {
  if (car.id === 3) {
    return { ...car, year: 2021 };
  } else {
    return car;
  }
});

console.log(updatedCars);

// Exercise 6
let gadgets = [
  { id: 1, name: "iPhone", brand: "Apple" },
  { id: 2, name: "Pixel", brand: "Google" },
  { id: 3, name: "Galaxy", brand: "Samsung" },
];

let deletedGadgets = gadgets.filter((gadget) => gadget.id !== 1);

console.log(deletedGadgets);

// Exercise 7
let projects = [
  { id: 1, name: "Project Alpha", duration: 12 },
  { id: 2, name: "Project Beta", duration: 10 },
  { id: 3, name: "Project Gamma", duration: 8 },
];

let updatedProjects = projects.map((project) => {
  if (project.id === 1) {
    return { ...project, duration: 14 };
  } else {
    return project;
  }
});

console.log(updatedProjects);

// Exercise 8
let restaurants = [
  { id: 1, name: "Pasta Palace", cuisine: "Italian" },
  { id: 2, name: "Dragon Wok", cuisine: "Chinese" },
  { id: 3, name: "Burger Barn", cuisine: "American" },
];

let deletedRestaurants = restaurants.filter(
  (restaurant) => restaurant.id !== 2
);

console.log(deletedRestaurants);

// Exercise 9
let athletes = [
  { id: 1, name: "John", score: 85 },
  { id: 2, name: "Mike", score: 92 },
  { id: 3, name: "Sara", score: 88 },
];

let updatedAthletes = athletes.map((athlete) => {
  if (athlete.id === 2) {
    return { ...athlete, score: 95 };
  } else {
    return athlete;
  }
});

console.log(updatedAthletes);

// Exercise 10
let movies = [
  { id: 1, title: "Inception", rating: 8.8 },
  { id: 2, title: "Titanic", rating: 7.8 },
  { id: 3, title: "The Room", rating: 3.7 },
];

let deletedMovies = movies.filter((movie) => movie.id !== 3);

console.log(deletedMovies);

// Exercise 11
let cities = [
  { id: 1, name: "Los Angeles", population: 4000000 },
  { id: 2, name: "New York", population: 8175133 },
  { id: 3, name: "Chicago", population: 2695598 },
];

let updatedCities = cities.map((city) => {
  if (city.id === 3) {
    return { ...city, population: 8500000 };
  } else {
    return city;
  }
});

console.log(updatedCities);

// Exercise 12
let courses = [
  { id: 1, title: "Mathematics", duration: "3 months" },
  { id: 2, title: "Physics", duration: "4 months" },
  { id: 3, title: "Chemistry", duration: "5 months" },
];

let deletedCourses = courses.filter((course) => course.id !== 1);

console.log(deletedCourses);

// Exercise 13
let pets = [
  { id: 1, name: "Whiskers", type: "Cat" },
  { id: 2, name: "Rover", type: "Fish" },
  { id: 3, name: "Bella", type: "Dog" },
];

let updatedPets = pets.map((pet) => {
  if (pet.id === 2) {
    return { ...pet, type: "Dog" };
  } else {
    return pet;
  }
});

console.log(updatedPets);

// Exercise 14
let computers = [
  { id: 1, brand: "Apple", model: "MacBook Pro" },
  { id: 2, brand: "Dell", model: "XPS 13" },
  { id: 3, brand: "HP", model: "Spectre x360" },
];

let deletedComputers = computers.filter((computer) => computer.id !== 3);

console.log(deletedComputers);

// Exercise 15
let appliances = [
  { id: 1, name: "Microwave", wattage: 1000 },
  { id: 2, name: "Toaster", wattage: 800 },
  { id: 3, name: "Blender", wattage: 500 },
];

let updatedAppliances = appliances.map((appliance) => {
  if (appliance.id === 1) {
    return { ...appliance, wattage: 1200 };
  } else {
    return appliance;
  }
});

console.log(updatedAppliances);
