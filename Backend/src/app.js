const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const commentRoutes = require("./routes/commentRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(cors());

// ❗ DO NOT use express.json() before multer routes
app.use("/api/tickets", ticketRoutes);

// JSON parsing AFTER multipart routes
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/test", testRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
