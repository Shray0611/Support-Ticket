const User = require("../models/User");
const Ticket = require("../models/Ticket");

exports.getAgentsWithTicketCount = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }).select("name email");

    const data = await Promise.all(
      agents.map(async (agent) => {
        const count = await Ticket.countDocuments({
          assignedTo: agent._id,
        });

        return {
          _id: agent._id,
          name: agent.name,
          email: agent.email,
          ticketCount: count,
        };
      })
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch agents" });
  }
};
