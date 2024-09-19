let express = require("express");
let { employee } = require("./models/employee.model");
let { sequelize } = require("./lib/index");

let app = express();
app.use(express.json());

let employeeData = [
  {
    id: 1,
    name: "John Doe",
    designation: "Manager",
    department: "Sales",
    salary: 90000,
  },
  {
    id: 2,
    name: "Anna Brown",
    designation: "Developer",
    department: "Engineering",
    salary: 80000,
  },
  {
    id: 3,
    name: "James Smith",
    designation: "Designer",
    department: "Marketing",
    salary: 70000,
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
  },
  {
    id: 5,
    name: "Michael Wilson",
    designation: "Developer",
    department: "Engineering",
    salary: 85000,
  },
  {
    id: 6,
    name: "Sarah Johnson",
    designation: "Data Analyst",
    department: "Data Science",
    salary: 75000,
  },
  {
    id: 7,
    name: "David Lee",
    designation: "QA Engineer",
    department: "Quality Assurance",
    salary: 70000,
  },
  {
    id: 8,
    name: "Linda Martinez",
    designation: "Office Manager",
    department: "Administration",
    salary: 50000,
  },
  {
    id: 9,
    name: "Robert Hernandez",
    designation: "Product Manager",
    department: "Product",
    salary: 95000,
  },
  {
    id: 10,
    name: "Karen Clark",
    designation: "Sales Associate",
    department: "Sales",
    salary: 55000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employeeData);
    res.status(200).json({ message: "Database Seeding Successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding the data", error: error.message });
  }
});

// Exercise 1: Fetch all employees
async function fetchAllEmployees() {
  let employees = await employee.findAll();
  return { employees };
}

app.get("/employees", async (req, res) => {
  try {
    let result = await fetchAllEmployees();
    if (result.employees.length === 0) {
      return res.status(404).json({ message: "Employees Not Found." });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Add a new employee in the database
async function addNewEmployees(newEmployee) {
  let createdEmployee = await employee.create(newEmployee);
  return { newEmployee: createdEmployee };
}

app.post("/employees/new", async (req, res) => {
  try {
    let newEmployee = req.body.newEmployee;
    let response = await addNewEmployees(newEmployee);
    if (!response.newEmployee) {
      return res.status(404).json({ message: "Employee Not Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Update employee information
async function updateEmployeeById(updatedEmployeeData, id) {
  let employeeDetails = await employee.findOne({ where: { id } });
  if (!employeeDetails) {
    return {};
  }
  employeeDetails.set(updatedEmployeeData);
  let updatedEmployee = await employeeDetails.save();
  return { message: "Employee Updated Successfully.", updatedEmployee };
}

app.post("/employees/update/:id", async (req, res) => {
  try {
    let newEmployees = req.body;
    let id = parseInt(req.params.id);
    let response = await updateEmployeeById(newEmployees, id);
    if (!response.message) {
      res.status(404).json({ message: "Employee Not Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Delete an employee from the database
async function deleteEmployeeById(id) {
  let destroyedEmployee = await employee.destroy({ where: { id } });
  if (destroyedEmployee === 0) {
    return { message: "Employee Not Found." };
  }
  return { message: "Employee Deleted Successfully." };
}

app.get("/employees/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteEmployeeById(id);
    if (response.message === "Employee Not Found.") {
      return res.status(404).json(response);
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
