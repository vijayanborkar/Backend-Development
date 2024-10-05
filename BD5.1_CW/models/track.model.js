<<<<<<< HEAD
let { DataTypes, sequelize } = require('../lib/');

let track = sequelize.define('track', {
  name: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  release_year: DataTypes.INTEGER,
  artist: DataTypes.TEXT,
  album: DataTypes.TEXT,
  duration: DataTypes.INTEGER,
});

module.exports = {
  track,
};
=======
let { DataTypes, sequelize } = require('../lib/');

let track = sequelize.define('track', {
  name: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  release_year: DataTypes.INTEGER,
  artist: DataTypes.TEXT,
  album: DataTypes.TEXT,
  duration: DataTypes.INTEGER,
});

module.exports = {
  track,
};
>>>>>>> d8e2bf4496ae64274a1e5f75a10a42f0faaac46c
