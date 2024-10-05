let { DataTypes, sequelize } = require('../lib/index');

let post = sequelize.define('post', {
  title: DataTypes.TEXT,
  author: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  publication_year: DataTypes.INTEGER,
  publisher: DataTypes.TEXT,
  pages: DataTypes.INTEGER,
});

module.exports = {
  post,
};
