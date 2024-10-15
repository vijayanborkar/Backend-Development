const request = require("supertest");
let {
  app,
  getAllEmployees,
  getEmployeeById,
  addEmployee,
} = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  addEmployee: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3007, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all employees", async () => {
    const mockEmployees = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        department: "Engineering",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        department: "Marketing",
      },
    ];
    getAllEmployees.mockResolvedValue(mockEmployees);

    let result = await request(server).get("/employees");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployees);
  });

  it("should retrieve a specific employees by id", async () => {
    const mockEmployees = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Engineering",
    };
    getEmployeeById.mockResolvedValue(mockEmployees);

    const result = await request(server).get("/employees/details/1");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockEmployees);
  });

  it("should return 404 for a non-existing employee", async () => {
    getEmployeeById.mockResolvedValue(null);

    const result = await request(server).get("/employees/details/999");

    expect(result.statusCode).toEqual(404);
  });

  it("should add a new employee", async () => {
    const mockEmployees = {
      id: 3,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      department: "Sales",
    };
    addEmployee.mockResolvedValue(mockEmployees);

    const result = await request(server).post("/employees/new").send({
      name: "Alice Brown",
      email: "alice.brown@example.com",
      department: "Sales",
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(mockEmployees);
  });
});
