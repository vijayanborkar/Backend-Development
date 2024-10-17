const request = require("supertest");
const { app } = require("../index.js");
const {
  getAllArticles,
  getArticleById,
  getAllComments,
  getCommentById,
  getUserById,
} = require("../article.js");
const http = require("http");
const { geteuid } = require("process");

jest.mock("../article.js", () => ({
  ...jest.requireActual("../article.js"),
  getAllArticles: jest.fn(),
  getArticleById: jest.fn(),
  getAllComments: jest.fn(),
  getCommentById: jest.fn(),
  getUserById: jest.fn(),
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
  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("GET API /articles should return 404 if no articles are found", async () => {
    getAllArticles.mockReturnValue([]);

    const response = await request(server).get("/articles");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("No Articles Found");
  });

  it("GET API /articles/:id should return 404 for non-existing article", async () => {
    getArticleById.mockReturnValue(null);

    const response = await request(server).get("/articles/999");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("No Article Found");
  });

  it("GET API /comments should return 404 if no comments are found", async () => {
    getAllComments.mockReturnValue([]);

    const response = await request(server).get("/comments");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("No Comments Found");
  });

  it("GET API /comments/:id should return 404 for non-existing comment", async () => {
    getCommentById.mockReturnValue(null);

    const response = await request(server).get("/comments/979");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("No Comment Found");
  });

  it("GET API /user/:id should return 404 for non-existing user", async () => {
    getUserById.mockReturnValue(null);

    const response = await request(server).get("/users/000");

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("No User Found");
  });
});
