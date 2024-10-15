const request = require("supertest");
let { app, getAllRecipes, getRecipeById, addRecipe } = require("../index.js");
const http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getAllRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  addRecipe: jest.fn(),
}));

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3008, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all recipes", async () => {
    const mockRecipes = [
      {
        id: 1,
        name: "Spaghetti Bolognese",
        cuisine: "Italian",
        difficulty: "Medium",
      },
      {
        id: 2,
        name: "Chicken Tikka Masala",
        cuisine: "Indian",
        difficulty: "Hard",
      },
    ];
    getAllRecipes.mockResolvedValue(mockRecipes);

    const result = await request(server).get("/recipes");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipes);
  });

  it("should retrieve recipe by id", async () => {
    const mockRecipes = {
      id: 1,
      name: "Spaghetti Bolognese",
      cuisine: "Italian",
      difficulty: "Medium",
    };
    getRecipeById.mockResolvedValue(mockRecipes);

    const result = await request(server).get("/recipes/details/1");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockRecipes);
  });

  it("should return 404 for a non-existing recipe", async () => {
    getRecipeById.mockResolvedValue(null);

    const result = await request(server).get("/recipes/details/999");

    expect(result.statusCode).toEqual(404);
  });

  it("should add a new recipe", async () => {
    const mockRecipes = {
      id: 3,
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    };
    addRecipe.mockResolvedValue(mockRecipes);

    const result = await request(server).post("/recipes/new").send({
      name: "Sushi",
      cuisine: "Japanese",
      difficulty: "Hard",
    });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(mockRecipes);
  });
});
