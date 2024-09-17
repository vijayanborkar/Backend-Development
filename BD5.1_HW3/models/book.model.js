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
