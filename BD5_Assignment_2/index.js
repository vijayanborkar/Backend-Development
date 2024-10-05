let express = require("express");
let { sequelize } = require("./lib/index");
let { employee } = require("./models/employee.model");
let { department } = require("./models/department.model");
let { role } = require("./models/role.model");
let { employeeDepartment } = require("./models/employeeDepartment.model");
let { employeeRole } = require("./models/employeeRole.model");

let app = express();
app.use(express.json());

let PORT = process.env.PORT || 3000;

// Helper Functions

// Helper function to get employee's associated departments
async function getEmployeeDepartments(employeeId) {
  const employeeDepartments = await employeeDepartment.findAll({
    where: { employeeId },
  });

  let departmentData = [];
  for (let empDep of employeeDepartments) {
    const departmentFinal = await department.findOne({
      where: { id: empDep.departmentId },
    });
    if (departmentFinal) {
      departmentData.push(departmentFinal);
    }
  }

  return departmentData;
}

// Helper function to get employee's associated roles
async function getEmployeeRoles(employeeId) {
  const employeeRoles = await employeeRole.findAll({
    where: { employeeId },
  });

  let roleData = [];
  for (let empRole of employeeRoles) {
    const roleFinal = await role.findOne({
      where: { id: empRole.roleId },
    });
    if (roleFinal) {
      roleData.push(roleFinal);
    }
  }

  return roleData;
}

// Helper function to get employee details with associated departments and roles
async function getEmployeeDetails(employeeData) {
  const departments = await getEmployeeDepartments(employeeData.id);
  const roles = await getEmployeeRoles(employeeData.id);

  return {
    ...employeeData.dataValues,
    department: departments,
    role: roles,
  };
}

// Endpoint to seed database
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  const departments = await department.bulkCreate([
    { name: "Engineering" },
    { name: "Marketing" },
  ]);

  const roles = await role.bulkCreate([
    { title: "Software Engineer" },
    { title: "Marketing Specialist" },
    { title: "Product Manager" },
  ]);

  const employees = await employee.bulkCreate([
    { name: "Rahul Sharma", email: "rahul.sharma@example.com" },
    { name: "Priya Singh", email: "priya.singh@example.com" },
    { name: "Ankit Verma", email: "ankit.verma@example.com" },
  ]);

  // Associate employees with departments and roles using create method on junction models
  await employeeDepartment.create({
    employeeId: employees[0].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[0].id,
    roleId: roles[0].id,
  });

  await employeeDepartment.create({
    employeeId: employees[1].id,
    departmentId: departments[1].id,
  });
  await employeeRole.create({
    employeeId: employees[1].id,
    roleId: roles[1].id,
  });

  await employeeDepartment.create({
    employeeId: employees[2].id,
    departmentId: departments[0].id,
  });
  await employeeRole.create({
    employeeId: employees[2].id,
    roleId: roles[2].id,
  });

  return res.json({ message: "Database seeded!" });
});

// Exercise 1: Get All Employees
async function getAllEmployees() {
  let employeeData = await employee.findAll();
  let employees = [];

  for (let i = 0; i < employeeData.length; i++) {
    let detailEmployees = await getEmployeeDetails(employeeData[i]);
    employees.push(detailEmployees);
  }
  return { employees };
}

app.get("/employees", async (req, res) => {
  try {
    let response = await getAllEmployees();
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No Employees Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Employee by ID
async function getEmployeeById(employeeId) {
  let employeeData = await employee.findOne({ where: { id: employeeId } });
  if (!employeeData) {
    return res.status(404).json({ message: "Employee not found." });
  }
  return getEmployeeDetails(employeeData);
}

app.get("/employees/details/:id", async (req, res) => {
  try {
    let employeeId = parseInt(req.params.id);
    let employee = await getEmployeeById(employeeId);
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Employees by Department
async function getEmployeesByDepartment(departmentId) {
  let employeeDepartments = await employeeDepartment.findAll({
    where: { departmentId },
  });

  let employees = [];

  for (let i = 0; i < employeeDepartments.length; i++) {
    let empDep = employeeDepartments[i];
    let employeeData = await employee.findOne({
      where: { id: empDep.employeeId },
    });
    if (employeeData) {
      let detailEmployees = await getEmployeeDetails(employeeData);
      employees.push(detailEmployees);
    }
  }
  return { employees };
}

app.get("/employees/department/:departmentId", async (req, res) => {
  try {
    let departmentId = parseInt(req.params.departmentId);
    let response = await getEmployeesByDepartment(departmentId);
    if (response.employees.department === 0) {
      return res.status(404).json({ message: "No Employees Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get All Employees by Role
async function getEmployeeByRole(roleId) {
  let employeeRoles = await employeeRole.findAll({
    where: { roleId },
  });

  let employees = [];

  for (let i = 0; i < employeeRoles.length; i++) {
    let empRole = employeeRoles[i];
    let employeeData = await employee.findOne({
      where: { id: empRole.employeeId },
    });
    if (employeeData) {
      let detailEmployees = await getEmployeeDetails(employeeData);
      employees.push(detailEmployees);
    }
  }
  return { employees };
}

app.get("/employees/role/:roleId", async (req, res) => {
  try {
    let roleId = parseInt(req.params.roleId);
    let response = await getEmployeeByRole(roleId);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No Employees Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Get Employees Sorted by Name
async function getEmployeesByName(order) {
  let sortOrder = order === "desc" ? "DESC" : "ASC";
  let employeeData = await employee.findAll({
    order: [["name", sortOrder]],
  });

  let employees = [];

  for (let i = 0; i < employeeData.length; i++) {
    let detailedEmployee = await getEmployeeDetails(employeeData[i]);
    employees.push(detailedEmployee);
  }
  return { employees };
}

app.get("/employees/sort-by-name", async (req, res) => {
  try {
    let order = req.query.order;
    let response = await getEmployeesByName(order);
    if (response.employees.length === 0) {
      return res.status(404).json({ message: "No Employees Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Add a New Employee
async function addEmployee(newEmployee) {
  let createdEmployee = await employee.create(newEmployee);

  if (newEmployee.departmentId) {
    await employeeDepartment.create({
      employeeId: createdEmployee.id,
      departmentId: newEmployee.departmentId,
    });
  }

  if (newEmployee.roleId) {
    await employeeRole.create({
      employeeId: createdEmployee.id,
      roleId: newEmployee.roleId,
    });
  }

  let employeeWithDetails = await getEmployeeDetails(createdEmployee);

  return employeeWithDetails;
}

app.post("/employees/new", async (req, res) => {
  try {
    let newEmployee = req.body;
    let response = await addEmployee(newEmployee);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Update Employee Details
async function updateEmployeeDetails(employeeData) {
  let existingEmployee = await employee.findOne({
    where: { id: employeeData.id },
  });

  if (!existingEmployee) {
    return null;
  }

  if (employeeData.name) existingEmployee.name = employeeData.name;
  if (employeeData.email) existingEmployee.email = employeeData.email;

  await existingEmployee.save();

  if (employeeData.departmentId) {
    await employeeDepartment.destroy({
      where: { employeeId: employeeData.id },
    });
    await employeeDepartment.create({
      employeeId: employeeEmployee.id,
      departmentId: employeeData.departmentId,
    });
  }

  if (employeeData.roleId) {
    await employeeRole.destroy({ where: { employeeId: employeeData.id } });
    await employeeRole.create({
      employeeId: employeeData.id,
      roleId: employeeData.roleId,
    });
  }

  let updatedEmployee = await getEmployeeDetails(existingEmployee);

  return updatedEmployee;
}

app.post("/employees/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    let employeeData = {
      id,
      name: req.body.name,
      email: req.body.email,
      departmentId: req.body.departmentId
        ? parseInt(req.body.departmentId)
        : undefined,
      roleId: req.body.roleId ? parseInt(req.body.roleId) : undefined,
    };

    let response = await updateEmployeeDetails(employeeData);
    if (!response) {
      return res.status(404).json({ message: "Employee Not Found." });
    }
    return res
      .status(200)
      .json({ message: "Employee Updated Successfully.", employee: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Delete an Employee
async function deleteEmployeeById(id) {
  await employeeDepartment.destroy({ where: { employeeId: id } });
  await employeeRole.destroy({ where: { employeeId: id } });
  let deleteCount = await employee.destroy({ where: { id } });
  if (deleteCount === 0) {
    return null;
  }
  return { message: `Employee with ID ${id} is Deleted Successfully.` };
}

app.post("/employees/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    if (!id) {
      return res.status(400).json({ message: "Invalid Employee Id." });
    }
    let response = await deleteEmployeeById(id);
    if (response === null) {
      return res.status(404).json({ message: "Employee Cannot Be Deleted." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
