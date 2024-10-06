<<<<<<< HEAD
let { DataTypes, sequelize } = require('../lib/index');

let book = sequelize.define('book', {
  bookId: DataTypes.INTEGER,
  title: DataTypes.TEXT,
  author: DataTypes.INTEGER,
  genre: DataTypes.TEXT,
  publicationYear: DataTypes.INTEGER,
  publisher: DataTypes.INTEGER,
  pages: DataTypes.INTEGER,
});

module.exports = {
  book,
};
=======
let { DataTypes, sequelize } = require('../lib/index');

let book = sequelize.define('book', {
  bookId: DataTypes.INTEGER,
  title: DataTypes.TEXT,
  author: DataTypes.INTEGER,
  genre: DataTypes.TEXT,
  publicationYear: DataTypes.INTEGER,
  publisher: DataTypes.INTEGER,
  pages: DataTypes.INTEGER,
});

module.exports = {
  book,
};
>>>>>>> d8e2bf4496ae64274a1e5f75a10a42f0faaac46c
