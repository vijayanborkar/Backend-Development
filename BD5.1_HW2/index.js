<<<<<<< HEAD
let express = require('express');
let { employee } = require('./models/employee.model');
let { sequelize } = require('./lib/index');

let app = express();

let employeeData = [
  {
    employeeId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'Sales',
    salary: 60000,
    hireDate: '2019-05-15',
    isFullTime: true,
  },
  {
    employeeId: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    department: 'Marketing',
    salary: 55000,
    hireDate: '2020-07-23',
    isFullTime: true,
  },
  {
    employeeId: 3,
    firstName: 'Sam',
    lastName: 'Wilson',
    email: 'sam.wilson@example.com',
    department: 'Engineering',
    salary: 75000,
    hireDate: '2018-01-12',
    isFullTime: true,
  },
  {
    employeeId: 4,
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@example.com',
    department: 'Human Resources',
    salary: 50000,
    hireDate: '2021-03-30',
    isFullTime: false,
  },
  {
    employeeId: 5,
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    department: 'Finance',
    salary: 62000,
    hireDate: '2017-11-08',
    isFullTime: true,
  },
  {
    employeeId: 6,
    firstName: 'Sara',
    lastName: 'Miller',
    email: 'sara.miller@example.com',
    department: 'Engineering',
    salary: 70000,
    hireDate: '2019-09-17',
    isFullTime: true,
  },
  {
    employeeId: 7,
    firstName: 'David',
    lastName: 'Clark',
    email: 'david.clark@example.com',
    department: 'Operations',
    salary: 48000,
    hireDate: '2022-02-10',
    isFullTime: false,
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
=======
let express = require('express');
let { employee } = require('./models/employee.model');
let { sequelize } = require('./lib/index');

let app = express();

let employeeData = [
  {
    employeeId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'Sales',
    salary: 60000,
    hireDate: '2019-05-15',
    isFullTime: true,
  },
  {
    employeeId: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    department: 'Marketing',
    salary: 55000,
    hireDate: '2020-07-23',
    isFullTime: true,
  },
  {
    employeeId: 3,
    firstName: 'Sam',
    lastName: 'Wilson',
    email: 'sam.wilson@example.com',
    department: 'Engineering',
    salary: 75000,
    hireDate: '2018-01-12',
    isFullTime: true,
  },
  {
    employeeId: 4,
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@example.com',
    department: 'Human Resources',
    salary: 50000,
    hireDate: '2021-03-30',
    isFullTime: false,
  },
  {
    employeeId: 5,
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    department: 'Finance',
    salary: 62000,
    hireDate: '2017-11-08',
    isFullTime: true,
  },
  {
    employeeId: 6,
    firstName: 'Sara',
    lastName: 'Miller',
    email: 'sara.miller@example.com',
    department: 'Engineering',
    salary: 70000,
    hireDate: '2019-09-17',
    isFullTime: true,
  },
  {
    employeeId: 7,
    firstName: 'David',
    lastName: 'Clark',
    email: 'david.clark@example.com',
    department: 'Operations',
    salary: 48000,
    hireDate: '2022-02-10',
    isFullTime: false,
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
>>>>>>> d8e2bf4496ae64274a1e5f75a10a42f0faaac46c
