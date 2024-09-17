let { DataTypes, sequelize } = require("../lib/index");

let post = sequelize.define("post", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = {
  post,
};
