let express = require("express");
let { sequelize } = require("./lib/index");
let { agent } = require("./models/agent.model");
let { customer } = require("./models/customer.model");
let { ticket } = require("./models/ticket.model");
let { ticketCustomer } = require("./models/ticketCustomer.model");
let { ticketAgent } = require("./models/ticketAgent.model");

let app = express();
app.use(express.json());

let PORT = process.env.PORT || 3000;

// Helper Functions

// Get Ticket Customers
async function getTicketCustomers(ticketId) {
  const ticketCustomers = await ticketCustomer.findAll({
    where: { ticketId },
  });

  const customerData = await Promise.all(
    ticketCustomers.map(async (cus) => {
      return await customer.findOne({
        where: { customerId: cus.customerId },
      });
    })
  );

  return customerData;
}

// Get Ticket Agents
async function getTicketAgents(ticketId) {
  const ticketAgents = await ticketAgent.findAll({
    where: { ticketId },
  });

  const agentData = await Promise.all(
    ticketAgents.map(async (ag) => {
      return await agent.findOne({ where: { agentId: ag.agentId } });
    })
  );

  return agentData;
}

// Get Ticket Details
async function getTicketDetails(ticketData) {
  const customer = await getTicketCustomers(ticketData.id);
  const agent = await getTicketAgents(ticketData.id);

  return {
    ...ticketData.dataValues,
    customer,
    agent,
  };
}

// Seeding Data
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  let tickets = await ticket.bulkCreate([
    {
      ticketId: 1,
      title: "Login Issue",
      description: "Cannot login to account",
      status: "open",
      priority: 1,
      customerId: 1,
      agentId: 1,
    },
    {
      ticketId: 2,
      title: "Payment Failure",
      description: "Payment not processed",
      status: "closed",
      priority: 2,
      customerId: 2,
      agentId: 2,
    },
    {
      ticketId: 3,
      title: "Bug Report",
      description: "Found a bug in the system",
      status: "open",
      priority: 3,
      customerId: 1,
      agentId: 1,
    },
  ]);

  let customers = await customer.bulkCreate([
    { customerId: 1, name: "Alice", email: "alice@example.com" },
    { customerId: 2, name: "Bob", email: "bob@example.com" },
  ]);

  let agents = await agent.bulkCreate([
    { agentId: 1, name: "Charlie", email: "charlie@example.com" },
    { agentId: 2, name: "Dave", email: "dave@example.com" },
  ]);

  await ticketCustomer.bulkCreate([
    { ticketId: tickets[0].id, customerId: customers[0].id },
    { ticketId: tickets[2].id, customerId: customers[0].id },
    { ticketId: tickets[1].id, customerId: customers[1].id },
  ]);

  await ticketAgent.bulkCreate([
    { ticketId: tickets[0].id, agentId: agents[0].id },
    { ticketId: tickets[2].id, agentId: agents[0].id },
    { ticketId: tickets[1].id, agentId: agents[1].id },
  ]);

  return res.json({ message: "Database seeded successfully" });
});

// API's

// Exercise 1: Get All Tickets
async function getAllTicket() {
  let ticketData = await ticket.findAll();
  let tickets = [];

  for (let i = 0; i < ticketData.length; i++) {
    let detailTicket = await getTicketDetails(ticketData[i]);
    tickets.push(detailTicket);
  }
  return { tickets };
}

app.get("/tickets", async (req, res) => {
  try {
    let response = await getAllTicket();
    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No Tickets Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Ticket by ID
async function getTicketById(ticketId) {
  let ticketData = await ticket.findOne({ where: { id: ticketId } });
  if (!ticketData) {
    return res.status(404).json({ message: "Ticket not found." });
  }
  return getTicketDetails(ticketData);
}

app.get("/tickets/details/:id", async (req, res) => {
  try {
    let ticketId = parseInt(req.params.id);
    let ticket = await getTicketById(ticketId);
    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Tickets by Status
async function getTicketsByStatus(status) {
  let ticketData = await ticket.findAll({ where: { status } });
  let tickets = [];

  for (let i = 0; i < ticketData.length; i++) {
    let detailTicket = await getTicketDetails(ticketData[i]);
    tickets.push(detailTicket);
  }
  return { tickets };
}

app.get("/tickets/status/:status", async (req, res) => {
  try {
    let status = req.params.status;
    let response = await getTicketsByStatus(status);
    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No Tickets Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Tickets Sorted by Priority
async function getTicketsByPriority() {
  let ticketData = await ticket.findAll({
    order: [["priority", "ASC"]],
  });

  let tickets = [];

  for (let i = 0; i < ticketData.length; i++) {
    let detailedTicket = await getTicketDetails(ticketData[i]);
    tickets.push(detailedTicket);
  }
  return { tickets };
}

app.get("/tickets/sort-by-priority", async (req, res) => {
  try {
    let response = await getTicketsByPriority();
    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No Tickets Found." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Add a New Ticket
async function addTicket(newTicket) {
  let createdTicket = await ticket.create(newTicket);

  if (newTicket.customerId) {
    await ticketCustomer.create({
      ticketId: createdTicket.id,
      customerId: newTicket.customerId,
    });
  }

  if (newTicket.agentId) {
    await ticketAgent.create({
      ticketId: createdTicket.id,
      agentId: newTicket.agentId,
    });
  }

  let ticketDetails = await getTicketDetails(createdTicket);
  return { ticket: ticketDetails };
}

app.post("/tickets/new", async (req, res) => {
  try {
    let newTicket = req.body;
    let response = await addTicket(newTicket);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Update Ticket Details
async function updateTicketDetails(ticketData) {
  let existingTicket = await ticket.findOne({ where: { id: ticketData.id } });

  if (!existingTicket) {
    return res.status(404).json({ message: "Ticket Not Found." });
  }

  if (ticketData.title) existingTicket.title = ticketData.title;
  if (ticketData.description)
    existingTicket.description = ticketData.description;
  if (ticketData.status) existingTicket.status = ticketData.status;
  if (ticketData.priority) existingTicket.priority = ticketData.priority;

  await existingTicket.save();

  if (ticketData.customerId) {
    await ticketCustomer.destroy({ where: { ticketId: ticketData.id } });
    await ticketCustomer.create({
      ticketId: ticketData.id,
      customerId: ticketData.customerId,
    });
  }

  if (ticketData.agentId) {
    await ticketAgent.destroy({ where: { ticketId: ticketData.id } });
    await ticketAgent.create({
      ticketId: ticketData.id,
      agentId: ticketData.agentId,
    });
  }

  const updatedTicket = await getTicketDetails(existingTicket);

  return updatedTicket;
}

app.post("/tickets/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    let ticketData = {
      id,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      customerId: req.body.customerId
        ? parseInt(req.body.customerId)
        : undefined,
      agentId: req.body.agentId ? parseInt(req.body.agentId) : undefined,
    };

    let response = await updateTicketDetails(ticketData);
    return res
      .status(200)
      .json({ message: "Ticket Updated Successfully.", ticket: response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Delete a Ticket
async function deleteTicketById(id) {
  await ticketAgent.destroy({ where: { ticketId: id } });
  await ticketCustomer.destroy({ where: { ticketId: id } });
  let deletedCount = await ticket.destroy({ where: { id } });
  if (deletedCount === 0) {
    return null;
  }
  return { message: `Ticket with ID ${id} deleted Successfully.` };
}

app.post("/tickets/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    if (!id) {
      return res.status(400).json({ message: "Invalid Ticket ID." });
    }
    let response = await deleteTicketById(id);
    if (!response.message) {
      return res.status(404).json({ message: "Ticket Cannot Be Deleted." });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
