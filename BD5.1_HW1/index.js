<<<<<<< HEAD
let express = require('express');
let { post } = require('./models/post.model');
let { sequelize } = require('./lib/index');

let app = express();

let bookData = [
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Psychological Thriller',
    publication_year: 2019,
    publisher: 'Celadon Books',
    pages: 336,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Memoir',
    publication_year: 2018,
    publisher: 'Random House',
    pages: 334,
  },
  {
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    genre: 'Historical Fiction',
    publication_year: 2018,
    publisher: 'G.P. Putnam’s Sons',
    pages: 370,
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    publication_year: 2018,
    publisher: 'Avery',
    pages: 320,
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    genre: 'Autobiography',
    publication_year: 2018,
    publisher: 'Crown Publishing Group',
    pages: 448,
  },
  {
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    genre: 'Literary Fiction',
    publication_year: 2020,
    publisher: 'Riverhead Books',
    pages: 343,
  },
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fantasy',
    publication_year: 2020,
    publisher: 'Canongate Books',
    pages: 304,
  },
  {
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    genre: 'Fantasy',
    publication_year: 2020,
    publisher: 'Tor Books',
    pages: 448,
  },
  {
    title: 'A Promised Land',
    author: 'Barack Obama',
    genre: 'Memoir',
    publication_year: 2020,
    publisher: 'Crown Publishing Group',
    pages: 768,
  },
  {
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    genre: 'Historical Fiction',
    publication_year: 2021,
    publisher: 'St. Martin’s Press',
    pages: 464,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(bookData);
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
=======
let express = require('express');
let { post } = require('./models/post.model');
let { sequelize } = require('./lib/index');

let app = express();

let bookData = [
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Psychological Thriller',
    publication_year: 2019,
    publisher: 'Celadon Books',
    pages: 336,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Memoir',
    publication_year: 2018,
    publisher: 'Random House',
    pages: 334,
  },
  {
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    genre: 'Historical Fiction',
    publication_year: 2018,
    publisher: 'G.P. Putnam’s Sons',
    pages: 370,
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    publication_year: 2018,
    publisher: 'Avery',
    pages: 320,
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    genre: 'Autobiography',
    publication_year: 2018,
    publisher: 'Crown Publishing Group',
    pages: 448,
  },
  {
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    genre: 'Literary Fiction',
    publication_year: 2020,
    publisher: 'Riverhead Books',
    pages: 343,
  },
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fantasy',
    publication_year: 2020,
    publisher: 'Canongate Books',
    pages: 304,
  },
  {
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    genre: 'Fantasy',
    publication_year: 2020,
    publisher: 'Tor Books',
    pages: 448,
  },
  {
    title: 'A Promised Land',
    author: 'Barack Obama',
    genre: 'Memoir',
    publication_year: 2020,
    publisher: 'Crown Publishing Group',
    pages: 768,
  },
  {
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    genre: 'Historical Fiction',
    publication_year: 2021,
    publisher: 'St. Martin’s Press',
    pages: 464,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await post.bulkCreate(bookData);
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
>>>>>>> d8e2bf4496ae64274a1e5f75a10a42f0faaac46c
