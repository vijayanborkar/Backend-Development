let { DataTypes, sequelize } = require("../lib/index");
let { ticket } = require("../models/ticket.model");
let { customer } = require("../models/customer.model");

let ticketCustomer = sequelize.define("ticketCustomer", {
  ticketCustomerId: {
    type: DataTypes.INTEGER,
  },
  ticketId: {
    type: DataTypes.INTEGER,
    references: {
      model: ticket,
      key: "ticketId",
    },
  },
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: customer,
      key: "customerId",
    },
  },
});

ticket.belongsToMany(customer, { through: ticketCustomer });
customer.belongsToMany(ticket, { through: ticketCustomer });

module.exports = { ticketCustomer };
