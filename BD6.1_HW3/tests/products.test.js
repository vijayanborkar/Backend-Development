let { getProducts, getProductById, addProduct } = require("../product");

// Exercise 4 : Test Get All Products
describe("Products Function", () => {
  it("Should get all products", () => {
    let products = getProducts();
    expect(products.length).toBe(4);
    expect(products).toEqual([
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
      { id: 3, name: "Headphones", category: "Electronics" },
      { id: 4, name: "Running Shoes", category: "Footwear" },
    ]);
  });

  // Exercise 5: Test Get Product by ID
  it("Should return a products by id", () => {
    let product = getProductById(1);
    expect(product).toEqual({
      id: 1,
      name: "Laptop",
      category: "Electronics",
    });
  });

  // Exercise 6: Test Get Product by Non-Existent ID
  it("Should return undefined for a non-existant product", () => {
    let product = getProductById(10);
    expect(product).toBeUndefined();
  });

  // Exercise 7: Test Add New Product
  it("Should add a new products", () => {
    let newProduct = { name: "New Product", category: "Category" };
    let addedProduct = addProduct(newProduct);
    expect(addedProduct).toEqual({
      id: 5,
      name: "New Product",
      category: "Category",
    });
    const products = getProducts();
    expect(products.length).toBe(5);
  });
});
