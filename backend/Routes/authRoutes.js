const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Admin email cannot be used for registration" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hash, role: "user" });

    res.json({ message: "User Registered Successfully", role: "user" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: `${user.role === "admin" ? "Admin" : "User"} Login Successful`,
      user: user,
      role: user.role,
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/claim/:itemId", auth, async (req, res) => {
  const { message } = req.body;
  const item = await Item.findById(req.params.itemId);

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.claims.push({
    userId: req.user.id,
    name: req.user.name,
    message,
    status: "pending"
  });

  await item.save();
  res.json({ message: "Claim submitted." });
});



module.exports = router;
