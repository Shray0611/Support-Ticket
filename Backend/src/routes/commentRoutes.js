const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const {
  addComment,
  getComments
} = require("../controllers/commentController");

router.post(
  "/:ticketId",
  authMiddleware,
  allowRoles("user", "agent", "admin"),
  addComment
);

router.get(
  "/:ticketId",
  authMiddleware,
  allowRoles("user", "agent", "admin"),
  getComments
);

module.exports = router;
