const request = require("supertest");
const { app } = require("../index.js");
const {
  getAllEmployees,
  getEmployeeById,
  getAllDepartments,
  getDepartmentById,
} = require("../employee.js");
const http = require("http");
const { resolveSoa } = require("dns");

jest.mock("../employee.js", () => ({
  ...jest.requireActual("../employee.js"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  getAllDepartments: jest.fn(),
  getDepartmentById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Error Handling Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET API /api/employees should return 404 if no employees are found", async () => {
    getAllEmployees.mockReturnValue([]);

    const response = await request(server).get("/api/employees");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No Employees Found");
  });

  it("GET API /api/employees/:id should return 404 for non-existing employee", async () => {
    getEmployeeById.mockReturnValue(null);

    const response = await request(server).get("/api/employees/999");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No Employee Found");
  });

  it("GET API /api/departments should return 404 if no departments are found", async () => {
    getAllDepartments.mockReturnValue([]);

    const response = await request(server).get("/api/departments");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No Departments Found");
  });

  it("GET API /api/departments/:id should return 404 for non-existing department", async () => {
    getDepartmentById.mockReturnValue(null);

    const response = await request(server).get("/api/departments/999");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No Department Found");
  });
});
