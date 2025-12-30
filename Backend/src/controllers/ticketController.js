const Ticket = require("../models/Ticket");

// CREATE TICKET (User)
exports.createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority,
      createdBy: req.user._id
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Failed to create ticket" });
  }
};

// GET USER'S OWN TICKETS
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

// GET ASSIGNED TICKETS (Agent)
exports.getAssignedTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ assignedTo: req.user._id })
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assigned tickets" });
  }
};

// GET ALL TICKETS (Admin)
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all tickets" });
  }
};
