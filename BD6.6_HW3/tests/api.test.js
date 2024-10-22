const request = require("supertest");
const http = require("http");
const { getAllBooks, getBookById } = require("../controllers");
const { app } = require("../index");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close();
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all books", () => {
    let mockedBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue(mockedBooks);
    let result = getAllBooks;
    expect(result).toEqual(mockedBooks);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoints Tests", async () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  it("GET /books should get all books", async () => {
    let mockedBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue(mockedBooks);

    const res = await request(server).get("/books");
    expect(res.statusCode).toBe(200);
    expect(res.body.books).toEqual(mockedBooks);
    expect(res.body.books.length).toBe(3);
  });

  it("GET /books/details/:id should get a book by id", async () => {
    let mockedBook = {
      bookId: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
    };

    getBookById.mockReturnValue(mockedBook);

    const res = await request(server).get("/books/details/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ book: mockedBook });
  });
});
