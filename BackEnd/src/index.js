const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const cors = require("cors");

const app = express();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("Weeeee!");
});

const PORT = process.env.PORT || 3200;

dbConnect();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
