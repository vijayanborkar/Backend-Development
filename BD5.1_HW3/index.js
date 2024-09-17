let express = require('express');
let { book } = require('./models/book.model');
let { sequelize } = require('./lib/index');

let app = express();

let bookData = [
  {
    bookId: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    publicationYear: 1925,
    publisher: 'Scribner',
    pages: 180,
  },
  {
    bookId: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    publicationYear: 1960,
    publisher: 'J.B. Lippincott & Co.',
    pages: 281,
  },
  {
    bookId: 3,
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    publicationYear: 1949,
    publisher: 'Secker & Warburg',
    pages: 328,
  },
  {
    bookId: 4,
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    publicationYear: 1851,
    publisher: 'Harper & Brothers',
    pages: 635,
  },
  {
    bookId: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    publicationYear: 1813,
    publisher: 'T. Egerton',
    pages: 279,
  },
  {
    bookId: 6,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    publicationYear: 1951,
    publisher: 'Little, Brown and Company',
    pages: 214,
  },
  {
    bookId: 7,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    publicationYear: 1937,
    publisher: 'George Allen & Unwin',
    pages: 310,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(bookData);
    res.status(200).json({ message: 'Database Seeding Successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
