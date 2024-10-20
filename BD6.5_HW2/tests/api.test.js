const request = require("supertest");
const { app, validateEmployee, validateCompany } = require("../index.js");
const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints to add data", () => {
  it("should add a new employee with valid input", async () => {
    const res = await request(server).post("/api/employees").send({
      name: "John Doe",
      companyId: 1,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "John Doe",
      companyId: 1,
    });
  });

  it("should return 400 from invalid employee input", async () => {
    const res = await request(server)
      .post("/api/employees")
      .send({ name: "John Doe" });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("CompanyId is required and should be a number.");
  });

  it("should add a new company with valid input", async () => {
    const res = await request(server).post("/api/companies").send({
      name: "TechCorp",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 1,
      name: "TechCorp",
    });
  });

  it("should return 400 from invalid company input", async () => {
    const res = await request(server).post("/api/companies").send({});

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Name is required and should be a string.");
  });
});

describe("Validation Functions", () => {
  it("should validate employee input correctly", () => {
    expect(validateEmployee({ name: "John Doe", companyId: 1 })).toBeNull();

    expect(validateEmployee({ name: "John Doe" })).toEqual(
      "CompanyId is required and should be a number."
    );
    expect(validateEmployee({ companyId: 1 })).toEqual(
      "Name is required and should be a string."
    );
  });

  it("should validate company input correctly", () => {
    expect(validateCompany({ name: "TechCorp" })).toBeNull();

    expect(validateCompany({})).toEqual(
      "Name is required and should be a string."
    );
  });
});
