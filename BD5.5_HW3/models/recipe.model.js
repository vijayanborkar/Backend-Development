let { DataTypes, sequelize } = require("../lib/index");

let recipe = sequelize.define("recipe", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  chef: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cuisine: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  preparationTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = { recipe };
