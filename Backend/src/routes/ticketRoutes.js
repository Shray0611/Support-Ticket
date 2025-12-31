const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createTicket,
  getMyTickets,
  getAssignedTickets,
  getAllTickets
} = require("../controllers/ticketController");

const {
  assignTicket,
  updateTicketStatus
} = require("../controllers/ticketController");

// User
router.post(
  "/",
  authMiddleware,
  allowRoles("user"),
  upload.single("file"),
  createTicket
);
router.get("/my", authMiddleware, allowRoles("user"), getMyTickets);

// Agent
router.get(
  "/assigned",
  authMiddleware,
  allowRoles("agent"),
  getAssignedTickets
);

// Admin
router.get("/", authMiddleware, allowRoles("admin"), getAllTickets);


// Admin assigns ticket
router.put(
  "/:id/assign",
  authMiddleware,
  allowRoles("admin"),
  assignTicket
);

// Agent/Admin updates status
router.put(
  "/:id/status",
  authMiddleware,
  allowRoles("agent", "admin","user"),
  updateTicketStatus
);


module.exports = router;
