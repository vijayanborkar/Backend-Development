let { getEmployees, getEmployeeById, addEmployee } = require("./employee");
const expres = require("express");
const app = express();
const PORT = 3000;

app.use(expres.json());

// Exercise 1: Get all employees
app.get("/employees", (req, res) => {
  res.json(getEmployees());
});

// Exercise 2: Get employee by ID
app.get("/employees/:id", (req, res) => {
  const employee = getEmployeeById(parseInt(req.params.id));
  if (!employee) return res.status(404).send("Employees not found");
  res.json(employee);
});

// Exercise 3: Push new employee
app.post("/employees", (req, res) => {
  const employee = addEmployee(req.body);
  res.status(201).json(employee);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
