<<<<<<< HEAD
let sq = require('sequelize');
let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.2_CW/database.sqlite',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
=======
let sq = require('sequelize');
let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.2_CW/database.sqlite',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
>>>>>>> d8e2bf4496ae64274a1e5f75a10a42f0faaac46c
