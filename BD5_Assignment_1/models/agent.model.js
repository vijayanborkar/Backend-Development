let { DataTypes, sequelize } = require("../lib/index");

let agent = sequelize.define("agent", {
  agentId: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

module.exports = { agent };
