const Ticket = require("../models/Ticket");
const { uploadFile } = require("../services/fileStorage");

// CREATE TICKET (User)
exports.createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    let attachments = [];
    console.log("REQ.FILE =>", req.file);
    if (req.file) {
      const uploaded = await uploadFile(req.file);
      attachments.push(uploaded);
    }

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority,
      attachments,
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

// ASSIGN TICKET (Admin)
exports.assignTicket = async (req, res) => {
  try {
    const { agentId } = req.body;
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.status !== "open") {
      return res.status(400).json({
        message: "Only open tickets can be assigned"
      });
    }

    ticket.assignedTo = agentId;
    ticket.status = "assigned";
    await ticket.save();

    res.json({ message: "Ticket assigned successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign ticket" });
  }
};


// UPDATE TICKET STATUS (Agent/Admin/User for close)
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const allowedTransitions = {
      open: ["assigned"],
      assigned: ["in-progress"],
      "in-progress": ["resolved"],
      resolved: ["closed"],
      closed: []
    };

    if (!allowedTransitions[ticket.status].includes(status)) {
      return res.status(400).json({
        message: `Cannot change status from ${ticket.status} to ${status}`
      });
    }

    // ONLY TICKET CREATOR CAN CLOSE
    if (
      status === "closed" &&
      ticket.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Only ticket owner can close the ticket"
      });
    }

    ticket.status = status;
    await ticket.save();

    res.json({ message: "Status updated successfully", ticket });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};


