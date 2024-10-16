let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "Brave New World", author: "Aldous Huxley" },
];

let reviews = [{ id: 1, bookId: 1, content: "Great book!" }];

// Functions

function getBooks() {
  return books;
}

function getBookById(id) {
  return books.find((book) => book.id === id);
}

function getReviews() {
  return reviews;
}

function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

module.exports = { getBooks, getBookById, getReviews, getReviewById };
