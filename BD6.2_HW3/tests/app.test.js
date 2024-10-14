let { app, getProducts, getProductById, addProduct } = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => ({
  ...jest.requireActual("../index.js"),
  getProducts: jest.fn(),
  getProductById: jest.fn(),
  addProduct: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3004, done);
});

afterAll((done) => {
  server.close(done);
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Function Tests", () => {
  // Exercise 4 : Test Get All Products
  test("getProducts should return a list a products", () => {
    const mockProducts = [
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
    ];

    getProducts.mockReturnValue(mockProducts);

    let result = getProducts();

    expect(result).toEqual(mockProducts);
    expect(getProducts).toHaveBeenCalled();
  });

  // Exercise 5: Test Get Product by ID
  test("getProductById should return a product details", () => {
    const mockProducts = {
      id: 1,
      name: "Laptop",
      category: "Electronics",
    };
    getProductById.mockReturnValue(mockProducts);

    let result = getProductById(1);

    expect(result).toEqual(mockProducts);
    expect(getProductById).toHaveBeenCalledWith(1);
  });

  // Exercise 6: Test Get Product by Non-Existent ID
  test("getProductsById should return undefined if product is not found", () => {
    getProductById.mockReturnValue(undefined);

    let result = getProductById(999);

    expect(result).toBeUndefined();
    expect(getProductById).toHaveBeenCalledWith(999);
  });

  // Exercise 7: Test Add New Product
  test("addProduct should add a new Product", () => {
    const newProduct = {
      productId: 5,
      name: "Tablet",
      category: "Electronics",
    };

    addProduct.mockReturnValue(newProduct);

    let result = addProduct(newProduct);

    expect(result).toEqual(newProduct);
    expect(addProduct).toHaveBeenCalledWith(newProduct);
  });
});
