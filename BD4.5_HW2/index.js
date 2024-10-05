const express = require('express');

const sqlite3 = require('sqlite3').verbose();

const { open } = require('sqlite');

const app = express();

const PORT = process.env.port || 3000;

let db;

(async () => {
  db = await open({
    filename: 'BD4.5_HW2/database.sqlite',

    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch Employees by Minimum Salary
async function filterEmployeesBySalary(minSalary) {
  let query = 'SELECT * FROM employees WHERE salary >= ?';
  let response = await db.all(query, [minSalary]);
  return { employees: response };
}

app.get('/employees/salary', async (req, res) => {
  try {
    let minSalary = req.query.minSalary;
    let result = await filterEmployeesBySalary(minSalary);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No employees found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Employees by Department and Minimum Experience
async function filterEmployeesByDepartmentAndExperience(
  department,
  minExperience
) {
  let query =
    'SELECT * FROM employees WHERE department = ? AND years_of_experience >= ?';
  let response = await db.all(query, [department, minExperience]);
  return { employees: response };
}

app.get('/employees/department-experience', async (req, res) => {
  try {
    let department = req.query.department;
    let minExperience = req.query.minExperience;
    let result = await filterEmployeesByDepartmentAndExperience(
      department,
      minExperience
    );
    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No employees found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Employees Ordered by Salary
async function fetchEmployeesOrderedBySalary() {
  let query = 'SELECT * FROM employees ORDER BY salary DESC';
  let response = await db.all(query);
  return { employees: response };
}

app.get('/employees/ordered-by-salary', async (req, res) => {
  try {
    let result = await fetchEmployeesOrderedBySalary();
    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No employees found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.5 HW2 Template' });
});
