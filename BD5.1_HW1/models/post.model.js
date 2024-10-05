<<<<<<< HEAD
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
=======
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
>>>>>>> d8e2bf4496ae64274a1e5f75a10a42f0faaac46c
