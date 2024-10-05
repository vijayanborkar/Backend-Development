let { DataTypes, sequelize } = require("../lib/index");

let employee = sequelize.define("employee", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  designation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  department: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = {
  employee,
};
