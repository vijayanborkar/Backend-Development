const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const PORT = process.env.port || 3000;
let db;

(async () => {
  db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database,
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();

// YOUR ENDPOINTS GO HERE

// Exercise 1: Fetch All Employees by Gender
async function filterByGender(gender) {
  let query = 'SELECT * FROM employees WHERE gender = ?';
  let response = await db.all(query, [gender]);
  return { employees: response };
}

app.get('/employees/gender/:gender', async (req, res) => {
  try {
    let gender = req.params.gender;
    let result = await filterByGender(gender);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No employees found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch All Employees by Department
async function filterByDepartment(department) {
  let query = 'SELECT * FROM employees WHERE department = ?';
  let response = await db.all(query, [department]);
  return { employees: response };
}

app.get('/employees/department/:department', async (req, res) => {
  try {
    let department = req.params.department;
    let result = await filterByDepartment(department);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No employees found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch All Employees by Job Title
async function filterByJobTitle(jobTitle) {
  let query = 'SELECT * FROM employees WHERE job_title = ?';
  let response = await db.all(query, [jobTitle]);
  return { employees: response };
}

app.get('/employees/job_title/:job_title', async (req, res) => {
  try {
    let jobTitle = req.params.job_title;
    let result = await filterByJobTitle(jobTitle);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No employees found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch All Employees by Location
async function filterByLocation(location) {
  let query = 'SELECT * FROM employees WHERE location = ?';
  let response = await db.all(query, [location]);
  return { employees: response };
}

app.get('/employees/location/:location', async (req, res) => {
  try {
    let location = req.params.location;
    let result = await filterByLocation(location);
    if (result.employees.length === 0) {
      return res.status(404).json({ message: 'No employees found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'BD4.3 CW3 Template' });
});
