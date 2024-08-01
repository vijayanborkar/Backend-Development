let express = require("express");
let app = express();
let port = 3000;

// Question 1:
let ages = [25, 30, 18, 22, 27];

function sortAgesInAscendingOrder(age1, age2) {
  return age1 - age2;
}

app.get("/ages/sort-ascending", (req, res) => {
  let agesCopy = ages.slice();
  agesCopy.sort(sortAgesInAscendingOrder);
  res.json(agesCopy);
});

// Question 2:
let ages2 = [25, 30, 18, 22, 27];

function sortAgesInDescendingOrder(age1, age2) {
  return age2 - age1;
}

app.get("/ages/sort-descending", (req, res) => {
  let ages2Copy = ages2.slice();
  ages2Copy.sort(sortAgesInDescendingOrder);
  res.json(ages2Copy);
});

// Question 3:
let students = [
  { name: "Rahul", rollNo: 101, marks: 85 },
  { name: "Sita", rollNo: 102, marks: 95 },
  { name: "Amit", rollNo: 103, marks: 70 },
];

function sortInDecendingOrder(student1, student2) {
  return student2.marks - student1.marks;
}

app.get("/students/sort-by-marks-descending", (req, res) => {
  let studentsCopy = students.slice();
  studentsCopy.sort(sortInDecendingOrder);
  res.json(studentsCopy);
});

// Question 4:
let cars = [
  { make: "Maruti", model: "Swift", mileage: 15 },
  { make: "Hyundai", model: "i20", mileage: 18 },
  { make: "Tata", model: "Nexon", mileage: 20 },
];

function sortCarByMileageInDecendingOrder(car1, car2) {
  return car2.mileage - car1.mileage;
}

app.get("/cars/sort-by-mileage-descending", (req, res) => {
  let carCopy = cars.slice();
  carCopy.sort(sortCarByMileageInDecendingOrder);
  res.json(carCopy);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
