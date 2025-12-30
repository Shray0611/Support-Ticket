const Comment = require("../models/Comment");
const Ticket = require("../models/Ticket");

// ADD COMMENT (User / Agent / Admin)
exports.addComment = async (req, res) => {
  try {
    const { message } = req.body;
    const { ticketId } = req.params;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const comment = await Comment.create({
      ticketId,
      author: req.user._id,
      message
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// GET COMMENTS FOR A TICKET
exports.getComments = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const comments = await Comment.find({ ticketId })
      .populate("author", "name role")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};
