let {
  getAllEmployees,
  getEmployeeById,
  getAllDepartments,
  getDepartmentById,
} = require("./employee.js");
const express = require("express");
const app = express();
app.use(express.json());

// Exercise 1: Get All Employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await getAllEmployees();
    if (employees.length === 0) {
      return res.status(404).json({ error: "No Employees Found" });
    }
    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 2: Get Employee by ID
app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await getEmployeeById(parseInt(req.params.id));
    if (!employee) {
      return res.status(404).json({ error: "No Employee Found" });
    }
    return res.json(department);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 3: Get All Departments
app.get("/api/departments", async (req, res) => {
  try {
    const departments = await getAllDepartments();
    if (departments.length === 0) {
      return res.status(404).json({ error: "No Departments Found" });
    }
    return res.json(departments);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 4: Get Department by ID
app.get("/api/departments/:id", async (req, res) => {
  try {
    const department = await getDepartmentById(parseInt(req.params.id));
    if (!department) {
      return res.status(404).json({ error: "No Department Found" });
    }
    return res.json(department);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };
