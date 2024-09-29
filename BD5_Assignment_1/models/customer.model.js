let { DataTypes, sequelize } = require("../lib/index");

let customer = sequelize.define("customer", {
  customerId: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

module.exports = { customer };
