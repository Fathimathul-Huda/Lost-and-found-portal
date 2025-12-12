const express = require("express");
const bcrypt = require("bcrypt");
const passwordRegex = /^.{6}$/;
const router =express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Item=require("../models/Item")
const auth = require("../middleware/authMiddleware");


router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    password = password.trim();
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be exactly 6 characters" });
    }

    email = email.trim().toLowerCase();
    const emailRegex = /^[a-z0-9._-]+@[a-z0-9-]+\.(com|in|net|org)$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL.toLowerCase()) {
      return res.status(403).json({ message: "Admin email cannot be used for registration" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash, role: "user" });

    res.json({ message: "User Registered Successfully" });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();

    const emailRegex = /^[a-z0-9._-]+@[a-z0-9-]+\.(com|in|net|org)$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // ⛔ No password length check here — admin must be allowed
    password = password.trim();

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
      token,
      role: user.role,
      user
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);
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

router.post("/reset-password", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // same validation as registration
    password = password.trim();
    const passwordRegex = /^.{6}$/; 
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be exactly 6 characters" });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Hash password (VERY IMPORTANT)
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password updated successfully!" });

  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
