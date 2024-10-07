let { getEmployees, getEmployeeById, addEmployee } = require("../employee");

// Exercise 4: Test get all employees
describe("Employee Function", () => {
  it("Should get all employees", () => {
    let employees = getEmployees();
    expect(employees.length).toBe(4);
    expect(employees).toEqual([
      { id: 1, name: "John Doe", position: "Software Engineer" },
      { id: 2, name: "Jane Smith", position: "Product Manager" },
      { id: 3, name: "Sam Johnson", position: "Designer" },
      { id: 4, name: "Lisa Brown", position: "DevOps Engineer" },
    ]);
  });

  // Exercise 5: Test get employee by ID
  it("Should return an employee by id", () => {
    let employee = getEmployeeById(1);
    expect(employee).toEqual({
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
    });
  });

  // Exercise 6: Test get employee by non-existent ID
  it("Should return undefined for a non-existent employee", () => {
    let employee = getEmployeeById(10);
    expect(employee).toBeUndefined();
  });

  // Exercise 7: Test add new employee
  it("Should add a new employee", () => {
    let newEmployee = { name: "New Employee", position: "Position" };
    let addedEmployee = addEmployee(newEmployee);
    expect(addedEmployee).toEqual({
      id: 5,
      name: "New Employee",
      position: "Position",
    });

    const employees = getEmployees();
    expect(employees.length).toBe(5);
  });
});
