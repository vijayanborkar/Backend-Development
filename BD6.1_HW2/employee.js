let employees = [
  { id: 1, name: "John Doe", position: "Software Engineer" },
  { id: 2, name: "Jane Smith", position: "Product Manager" },
  { id: 3, name: "Sam Johnson", position: "Designer" },
  { id: 4, name: "Lisa Brown", position: "DevOps Engineer" },
];

// Exercise 1: Get all employees
function getEmployees() {
  return employees;
}

// Exercise 2: Get employee by ID
function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

// Exercise 3: Push new employee
function addEmployee(employee) {
  let newEmployee = { id: employees.length + 1, ...employee };
  employees.push(newEmployee);
  return newEmployee;
}

module.exports = { getEmployees, getEmployeeById, addEmployee };
