<<<<<<< HEAD
let { DataTypes, sequelize } = require('../lib/index');

let post = sequelize.define(
  'post',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  post,
};
=======
let { DataTypes, sequelize } = require('../lib/index');

let post = sequelize.define(
  'post',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  post,
};
>>>>>>> d8e2bf4496ae64274a1e5f75a10a42f0faaac46c
