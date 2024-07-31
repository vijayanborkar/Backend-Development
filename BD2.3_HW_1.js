let express = require("express");
let app = express();
let port = 3000;

// Question 1:
let employees = [
  { name: "Rahul Gupta", department: "HR", salary: 50000 },
  { name: "Sneha Sharma", department: "Finance", salary: 60000 },
  { name: "Priya Singh", department: "Marketing", salary: 55000 },
  { name: "Amit Kumar", department: "IT", salary: 65000 },
];

function filterByDepartment(employee, department) {
  return employee.department === department;
}

app.get("/employees/department/:department", (req, res) => {
  let department = req.params.department;
  let result = employees.filter((employee) =>
    filterByDepartment(employee, department),
  );
  res.json(result);
});

// Question 2:
let bikes = [
  { make: "Hero", model: "Splendor", mileage: 80 },
  { make: "Yamaha", model: "Pulsar", mileage: 60 },
  { make: "TVS", model: "Apache", mileage: 70 },
];

function filterByMileage(bike, minMileage) {
  return bike.mileage > minMileage;
}

app.get("/bikes/mileage/:minMileage", (req, res) => {
  let minMileage = parseInt(req.params.minMileage);
  let result = bikes.filter((bike) => filterByMileage(bike, minMileage));
  res.json(result);
});

// Question 3:
let bikes3 = [
  { make: "Hero", model: "Splendor", mileage: 80 },
  { make: "Yamaha", model: "Pulsar", mileage: 60 },
  { make: "TVS", model: "Apache", mileage: 70 },
];

function filterByMake(bike, make) {
  return bike.make === make;
}

app.get("/bikes/make/:make", (req, res) => {
  let make = req.params.make;
  let result = bikes3.filter((bike) => filterByMake(bike, make));
  res.json(result);
});

// Question 4:
let songs = [
  { title: "Tum Hi Ho", genre: "Romantic", rating: 4 },
  { title: "Senorita", genre: "Pop", rating: 5 },
  { title: "Dil Chahta Hai", genre: "Bollywood", rating: 3 },
];

function filterByRating(song, minRating) {
  return song.rating > minRating;
}

app.get("/songs/rating/:minRating", (req, res) => {
  let minRating = parseInt(req.params.minRating);
  let result = songs.filter((song) => filterByRating(song, minRating));
  res.json(result);
});

// Question 5:
let songs5 = [
  { title: "Tum Hi Ho", genre: "Romantic", rating: 4 },
  { title: "Senorita", genre: "Pop", rating: 5 },
  { title: "Dil Chahta Hai", genre: "Bollywood", rating: 3 },
];

function filterByGenre(song, genre) {
  return song.genre === genre;
}

app.get("/songs/genre/:genre", (req, res) => {
  let genre = req.params.genre;
  let result = songs5.filter((song) => filterByGenre(song, genre));
  res.json(result);
});

// Question 6:
let tasks = [
  { taskId: 1, taskName: "Prepare Presentation", status: "pending" },
  { taskId: 2, taskName: "Attend Meeting", status: "in-progress" },
  { taskId: 3, taskName: "Submit Report", status: "completed" },
];

function filterByStatus(task, status) {
  return task.status === status;
}

app.get("/tasks/status/:status", (req, res) => {
  let status = req.params.status;
  let result = tasks.filter((task) => filterByStatus(task, status));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
