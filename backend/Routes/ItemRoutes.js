const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");
const upload = require("../Middleware/uploadmiddleware");


// ADD ITEM (with image upload)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const formattedCategory =
      req.body.category.charAt(0).toUpperCase() + req.body.category.slice(1).toLowerCase();

    const newItem = await Item.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      category: formattedCategory,  // Always saves as Lost / Found
      secretHint: req.body.secretHint,
      image: req.file ? req.file.filename : null,
      userId: req.user.id,
      status: "Pending",
      claimed: false,
    });

    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ALL ITEMS
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET ITEMS reported by logged-in user
router.get("/my", auth, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE ITEM
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    if (item.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not allowed" });

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});


// CLAIM ITEM
router.put("/:id/claim", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.claimed = true;
    await item.save();
    res.json({ message: "Item marked as claimed", item });
  } catch (err) {
    res.status(500).json(err);
  }
});


// PUBLIC — Missing Items (shows Lost items for ALL users)
router.get("/public/missing", async (req, res) => {
  try {
    const items = await Item.find({
      category: { $regex: /^lost$/i } // Lost / lost / LOST
    });

    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});


// PUBLIC — Found Items (optional page)
router.get("/public/found", async (req, res) => {
  try {
    const items = await Item.find({
      category: { $regex: /^found$/i }
    });

    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
