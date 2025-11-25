const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const Item = require("../models/Item");
const auth = require("../middleware/auth");

// Configure multer storage (files kept in /uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create item (with multiple images)
// field name in form-data: "images"
Router.post("/", auth, upload.array("images", 5), async (req, res) => {
  try {
    const { title, description, location, category, secretHint } = req.body;

    // multer puts files in req.files
    const images = (req.files || []).map(f => `/uploads/${f.filename}`); // store relative URL

    const newItem = await Item.create({
      title,
      description,
      location,
      category,
      images,
      secretHint,
      userId: req.user.id,     // from auth middleware
      status: "pending"
    });

    res.status(201).json({ message: "Item reported", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
