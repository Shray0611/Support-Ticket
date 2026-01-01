const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const User = require("../models/User");
const { getAgentsWithTicketCount } = require("../controllers/userController");

router.get(
  "/agents-with-count",
  authMiddleware,
  allowRoles("admin"),
  getAgentsWithTicketCount
);
// Admin: get all agents
router.get(
  "/agents",
  authMiddleware,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const agents = await User.find({ role: "agent" })
        .select("_id name email");

      res.json(agents);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  }
);

module.exports = router;
