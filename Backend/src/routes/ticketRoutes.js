const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createTicket,
  getMyTickets,
  getAssignedTickets,
  getAllTickets,
  assignTicket,
  updateTicketStatus
} = require("../controllers/ticketController");

// User creates ticket
router.post(
  "/",
  authMiddleware,
  allowRoles("user"),
  upload.single("file"), // 🔑 MUST be before controller
  createTicket
);
router.put(
  "/:id/assign",
  authMiddleware,
  allowRoles("admin"),
  assignTicket
);
router.put(
  "/:id/status",
  authMiddleware,
  allowRoles("agent", "admin", "user"),
  updateTicketStatus
);


router.get("/my", authMiddleware, allowRoles("user"), getMyTickets);
router.get("/assigned", authMiddleware, allowRoles("agent"), getAssignedTickets);
router.get("/", authMiddleware, allowRoles("admin"), getAllTickets);

module.exports = router;
