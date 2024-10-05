let { DataTypes, sequelize } = require("../lib/index");

let department = sequelize.define("department", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { department };
