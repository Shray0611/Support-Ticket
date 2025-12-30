const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

app.use("/api/test", testRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

module.exports = app;
