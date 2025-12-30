const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

router.get(
  "/admin-only",
  authMiddleware,
  allowRoles("admin"),
  (req, res) => {
    res.json({ message: "Admin access granted" });
  }
);

module.exports = router;
