const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

//Admin login can access this route only
router.get("/admin", verifyToken, roleMiddleware("admin"), (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  } else if (req.user.role === "admin") {
    return res.status(200).json({ message: "Admin route verified" });
  }
});

//User login can access this route only
router.get("/user", verifyToken, roleMiddleware("user"), (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Forbidden" });
  } else if (req.user.role === "user") {
    return res.status(200).json({ message: "User route verified" });
  }
});

module.exports = router;
