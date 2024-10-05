let { DataTypes, sequelize } = require("../lib/index");
let { agent } = require("../models/agent.model");
let { ticket } = require("../models/ticket.model");

let ticketAgent = sequelize.define("ticketAgent", {
  ticketAgentId: {
    type: DataTypes.INTEGER,
  },
  ticketId: {
    type: DataTypes.INTEGER,
    references: {
      model: ticket,
      key: "ticketId",
    },
  },
  agentId: {
    type: DataTypes.INTEGER,
    references: {
      model: agent,
      key: "agentId",
    },
  },
});

agent.belongsToMany(ticket, { through: ticketAgent });
ticket.belongsToMany(agent, { through: ticketAgent });

module.exports = { ticketAgent };
