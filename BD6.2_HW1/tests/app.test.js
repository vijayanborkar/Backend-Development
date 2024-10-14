let {
  app,
  getEmployees,
  getEmployeeById,
  addEmployee,
} = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3002, done);
});

afterAll((done) => {
  server.close(done);
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Function Tests", () => {
  // Exercise 4: Test get all employees
  test("getEmployees should return a list of employees", () => {
    const mockEmployees = [
      { id: 1, name: "John Doe", position: "Software Engineer" },
      { id: 2, name: "Jane Smith", position: "Product Manager" },
    ];

    getEmployees.mockReturnValue(mockEmployees);

    let result = getEmployees();

    expect(result).toEqual(mockEmployees);
    expect(getEmployees).toHaveBeenCalled();
  });

  // Exercise 5: Test get employee by ID
  test("getEmployeeById should return employee details", () => {
    const mockEmployees = {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
    };
    getEmployeeById.mockReturnValue(mockEmployees);
    let result = getEmployeeById(1);
    expect(result).toEqual(mockEmployees);
    expect(getEmployeeById).toHaveBeenCalledWith(1);
  });

  // Exercise 6: Test get employee by non-existent ID
  test("getEmployeeById should return undefined if employee is not found", () => {
    getEmployeeById.mockReturnValue(undefined);

    let result = getEmployeeById(999);
    expect(result).toBeUndefined();
    expect(getEmployeeById).toHaveBeenCalledWith(999);
  });

  // Exercise 7: Test add new employees
  test("addEmployee should add a new Employee", () => {
    const newEmployee = {
      employeeId: 4,
      name: "Alice Johnson",
      book: "HR Manager",
    };

    addEmployee.mockReturnValue(newEmployee);

    let result = addEmployee(newEmployee);
    expect(result).toEqual(newEmployee);
    expect(addEmployee).toHaveBeenCalledWith(newEmployee);
  });
});
