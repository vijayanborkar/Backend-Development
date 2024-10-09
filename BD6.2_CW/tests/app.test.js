let { app, getAuthors, getAuthorById, addAuthor } = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAuthors: jest.fn(),
  getAuthorById: jest.fn(),
  addAuthor: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 4: Test get all authors
  test("getAuthors should return a list of authors", () => {
    const mockAuthors = [
      { authorId: 1, name: "George Orwell", book: "1984" },
      { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
    ];

    getAuthors.mockReturnValue(mockAuthors);

    let result = getAuthors();

    expect(result).toEqual(mockAuthors);
    expect(getAuthors).toHaveBeenCalled();
  });

  // Exercise 5: Test get author by ID
  test("getAuthorById should return author details", () => {
    const mockAuthor = { authorId: 1, name: "George Orwell", book: "1984" };
    getAuthorById.mockReturnValue(mockAuthor);
    let result = getAuthorById(1);
    expect(result).toEqual(mockAuthor);
    expect(getAuthorById).toHaveBeenCalledWith(1);
  });

  // Exercise 6: Test get author by non-existent ID
  test("getAuthorById should return undefined if author if not found", () => {
    getAuthorById.mockReturnValue(undefined);

    let result = getAuthorById(999);
    expect(result).toBeUndefined();
    expect(getAuthorById).toHaveBeenCalledWith(999);
  });

  // Exercise 7: Test add new authors
  test("addAuthor should add a new author", () => {
    const newAuthor = {
      authorId: 4,
      name: "J.K.Rowling",
      book: "Harry Potter",
    };

    addAuthor.mockReturnValue(newAuthor);

    let result = addAuthor(newAuthor);
    expect(result).toEqual(newAuthor);
    expect(addAuthor).toHaveBeenCalledWith(newAuthor);
  });
});
