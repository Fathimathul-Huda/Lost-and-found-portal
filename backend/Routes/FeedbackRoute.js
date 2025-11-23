const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const Feedback = require("../models/Feedback");
const router = express.Router();

// Submit feedback (user must be logged in)
router.post("/submit", authMiddleware, async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields required" });
  }

  await Feedback.create({
    name,
    email,
    message,
    userId: req.user.id
  });

  res.json({ message: "Thank you! Your feedback has been submitted 😊" });
});

// Fetch feedback (admin only)
router.get("/all", authMiddleware, async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  const feedback = await Feedback.find().sort({ createdAt: -1 });
  res.json(feedback);
});

module.exports = router;
