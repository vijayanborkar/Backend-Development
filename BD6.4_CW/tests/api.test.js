const request = require("supertest");
const { app } = require("../index.js");
const {
  getBooks,
  getBookById,
  getReviews,
  getReviewById,
} = require("../book.js");
const http = require("http");

jest.mock("../book.js", () => ({
  ...jest.requireActual("../book.js"),
  getBooks: jest.fn(),
  getBookById: jest.fn(),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
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

  it("GET API /api/books should return 404 if no books are found", async () => {
    getBooks.mockReturnValue([]);

    const response = await request(server).get("/api/books");

    expect(response.status).toEqual(404);
    expect(response.body.error).toBe("No Books Found.");
  });

  it("GET API /api/books/:id should return 404 for non-existing book", async () => {
    getBookById.mockReturnValue(null);

    const response = await request(server).get("/api/books/999");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Book Not Found.");
  });

  it("GET API /api/reviews should return 404 if no reviews are found", async () => {
    getReviews.mockReturnValue([]);

    const response = await request(server).get("/api/reviews");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No Reviews Found.");
  });

  it("GET API /api/reviews should return 404 for non-existing review", async () => {
    getReviewById.mockReturnValue(null);

    const response = await request(server).get("/api/reviews/909");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Review Not Found.");
  });
});
