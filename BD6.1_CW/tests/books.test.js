let { getBooks, getBookById, addBook } = require("../book");

// Exercise 4: Test get all books
describe("Books Function", () => {
  it("Should get all books", () => {
    let books = getBooks();
    expect(books.length).toBe(4);
    expect(books).toEqual([
      { id: 1, title: "1984", author: "George Orwell" },
      { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
      { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
      { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee" },
    ]);
  });

  // Exercise 5: Test get book by ID
  it("should return a book by id", () => {
    let book = getBookById(1);
    expect(book).toEqual({ id: 1, title: "1984", author: "George Orwell" });
  });

  // Exercise 6: Test get book by non-existent ID
  it("should return undefined for a non-existant book", () => {
    let book = getBookById(99);
    expect(book).toBeUndefined();
  });

  // Exercise 7: Test add new book
  it("should add a new book", () => {
    let newBook = { title: "New Book", author: "Author Name" };
    let addedBook = addBook(newBook);
    expect(addedBook).toEqual({
      id: 5,
      title: "New Book",
      author: "Author Name",
    });
    const books = getBooks();
    expect(books.length).toBe(5);
  });
});
