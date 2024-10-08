let { app, getAuthors, getAuthorById, addAuthor } = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => {
  ...jest.requireActual("../index.js"),
    getAuthors: jest.fn(),
    getAuthorById: jest.fn(),
    addAuthor: jest.fn()
})

let server;

beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3001, done)
})

afterAll((done) => {
    server.close(done)
})

describe("Function Tests", () => {
    beforeEach() => {
        jest.clearAllMocks()
    })

    test("getAuthors should return a list of authors", () => {
        const mockAuthors = []
    })
})