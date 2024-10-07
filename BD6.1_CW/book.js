let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

// Exercise 1: Get all books
function getBooks() {
  return books;
}

// Exercise 2: Get book by ID
function getBookById(id) {
  return books.find((book) => book.id === id);
}

// Exercise 3: Add new book
function addBook(book) {
  let newBook = { id: books.length + 1, ...book };
  books.push(newBook);
  return newBook;
}

module.exports = { getBooks, getBookById, addBook };
