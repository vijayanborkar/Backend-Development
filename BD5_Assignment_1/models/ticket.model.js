let { DataTypes, sequelize } = require("../lib/index");

let ticket = sequelize.define("ticket", {
  ticketId: {
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.STRING,
  },
  customerId: {
    type: DataTypes.INTEGER,
  },
  agentId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { ticket };
