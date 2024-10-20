const express = require("express");
const app = express();
app.use(express.json());

let employees = [];
let companies = [];

// Exercise 1: Add a New Employee
function validateEmployee(employee) {
  if (!employee.name || typeof employee.name !== "string") {
    return "Name is required and should be a string.";
  }
  if (!employee.companyId || typeof employee.companyId !== "number") {
    return "CompanyId is required and should be a number.";
  }
  return null;
}

app.post("/api/employees", (req, res) => {
  let error = validateEmployee(req.body);
  if (error) return res.status(400).send(error);

  let employee = { id: employees.length + 1, ...req.body };
  employees.push(employee);
  res.status(201).json(employee);
});

// Exercise 2: Add a New Company
function validateCompany(company) {
  if (!company.name || typeof company.name !== "string") {
    return "Name is required and should be a string.";
  }
  return null;
}

app.post("/api/companies", (req, res) => {
  let error = validateCompany(req.body);
  if (error) return res.status(400).send(error);

  let company = { id: companies.length + 1, ...req.body };
  companies.push(company);
  res.status(201).json(company);
});

module.exports = { app, validateEmployee, validateCompany };
