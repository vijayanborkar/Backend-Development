const express = require("express");
const app = express();
app.use(express.json());

let employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
];

// Exercise 1: Get all employees
function getEmployees() {
  return employees;
}

app.get("/employees", (req, res) => {
  res.json(getEmployees());
});

// Exercise 2: Get employee by ID
function getEmployeeById(id) {
  return employees.find((employee) => employee.employeeId === id);
}

app.get("employees/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let employee = getEmployeeById(id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

// Exercise 3: Add new employee
function addEmployee(employee) {
  employees.push(employee);
  return employee;
}

app.post("/employees/new", (req, res) => {
  let employeeId = req.params.employeeId;
  let name = req.query.name;
  let position = req.query.position;
  let addedEmployee = addEmployee({ employeeId, name, position });
  res.status(201).json(addedEmployee);
});

module.exports = { app, getEmployees, getEmployeeById, addEmployee };
