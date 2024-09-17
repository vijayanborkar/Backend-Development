let express = require('express');
let { employee } = require('./models/employee.model');
let { sequelize } = require('./lib/index');

let app = express();

let employeeData = [
  {
    id: 1,
    name: 'Alice',
    salary: 60000,
    department: 'Engineering',
    designation: 'Software Engineer',
  },
  {
    id: 2,
    name: 'Bob',
    salary: 70000,
    department: 'Marketing',
    designation: 'Marketing Manager',
  },
  {
    id: 3,
    name: 'Charlie',
    salary: 80000,
    department: 'Engineering',
    designation: 'Senior Software Engineer',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employeeData);
    res.status(200).json({ message: 'Database Seeding Successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

// Exercise 1: Fetch all employees
async function fetchAllEmployees() {
  let employees = await employee.findAll();
  return { employees };
}

app.get('/employees', async (req, res) => {
  try {
    let result = await fetchAllEmployees();
    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'Employees Not Found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch employee details by ID
async function fetchEmployeeById(id) {
  let employees = await employee.findOne({ where: { id } });
  return { employee: employees };
}

app.get('/employees/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchEmployeeById(id);
    if (result.employee.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Employees for this Id found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all employees by department
async function fetchEmployeesByDepartment(department) {
  let employees = await employee.findAll({ where: { department } });
  return { employee: employees };
}

app.get('/employees/department/:department', async (req, res) => {
  try {
    let department = req.params.department;
    let result = await fetchEmployeesByDepartment(department);
    if (result.employee.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Employees in this Department Found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the employees by their salary
async function sortEmployeesBySalary(order) {
  let employees = await employee.findAll({ order: [['salary', order]] });
  return { employee: employees };
}

app.get('/employees/sort/salary', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortEmployeesBySalary(order);
    if (result.employee.length === 0) {
      return res.status(404).json({ message: 'No employees found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
