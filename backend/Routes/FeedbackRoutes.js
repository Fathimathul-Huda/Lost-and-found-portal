const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
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

// Fetch feedback (ADMIN ONLY)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    // role must be lowercase "admin"
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const feedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    return res.json(feedback);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
