const request = require("supertest");
const http = require("http");
const {
  shows,
  theatres,
  getAllShows,
  getShowById,
  addShow,
} = require("../controllers/index.js");
const { app } = require("../index.js");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllShows: jest.fn(),
  getShowById: jest.fn(),
  addShow: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints Tests", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  // Test 1: Get All Shows
  it("GET /shows should get all shows", async () => {
    const mockedShows = [
      { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
      { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
      { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
      { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
    ];

    getAllShows.mockReturnValue(mockedShows);

    const res = await request(server).get("/shows");
    expect(res.statusCode).toBe(200);
    expect(res.body.shows).toEqual(mockedShows);
    expect(res.body.shows.length).toBe(4);
  });

  // Test 2: Get Show by ID
  it("GET /shows/:id should get a show by id", async () => {
    const mockedShow = {
      showId: 1,
      title: "The Lion King",
      theatreId: 1,
      time: "7:00 PM",
    };

    getShowById.mockReturnValue(mockedShow);

    const res = await request(server).get("/shows/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ show: mockedShow });
  });

  // Test 3: Add a New Show
  it("POST /shows should add a new show", async () => {
    let newShow = {
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    };

    const createdShow = { id: 5, ...newShow };
    const res = await request(server).post("/shows").send(newShow);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(createdShow);

    getAllShows.mockReturnValue([
      { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
      { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
      { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
      { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
      createdShow,
    ]);

    const shows = getAllShows();
    expect(shows.length).toBe(5);
  });

  // Test 4: Error Handling for Get Show by Invalid ID
  it("GET /shows/:id should return 404 for non-existing show", async () => {
    getShowById.mockReturnValue(null);

    const res = await request(server).get("/shows/999");

    expect(res.statusCode).toEqual(404);
  });

  // Test 5: Input Validation for Add Show
  it("POST /shows should return 400 for invalid input", async () => {
    const res = await request(server)
      .post("/shows")
      .send({ title: "Phantom of the Opera", theatreId: 2 });

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Time is required and should be a string.");
  });
});

describe("Validation Functions", () => {
  it("should validate show input correctly", () => {
    expect(
      addShow({
        title: "Phantom of the Opera",
        theatreId: 2,
        time: "5:00 PM",
      })
    ).toEqual({
      showId: 5,
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    });

    expect(addShow({ title: "Phantom of the Opera", theatreId: 2 })).toEqual(
      "Time is required and should be a string."
    );

    expect(addShow({ title: "Phantom of the Opera", time: "5:00 PM" })).toEqual(
      "Theatre ID is required and should be a number."
    );

    expect(addShow({ theatreId: 2, time: "5:00 PM" })).toEqual(
      "Title is required and should be a string."
    );
  });
});

describe("Function Tests", () => {
  // Test 6: Mock getAllShows Function
  test("getAllShows should return a list of shows", () => {
    const mockShows = [
      { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
      { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
      { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
      { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
    ];

    getAllShows.mockReturnValue(mockShows);

    let result = getAllShows();

    expect(result).toEqual(mockShows);
    expect(getAllShows).toHaveBeenCalled();
  });

  // Test 7: Mock Add Show Function (Async)
  test("addShow should return a new show", async () => {
    const newShow = {
      showId: 5,
      title: "Phantom of the Opera",
      theatreId: 2,
      time: "5:00 PM",
    };

    addShow.mockReturnValue(newShow);

    let result = await addShow(newShow);
    expect(result).toEqual(newShow);
    expect(addShow).toHaveBeenCalledWith(newShow);
  });
});
