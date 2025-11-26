const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

// ---------------------------
// ADD ITEM (Only logged in users)
// ---------------------------
router.post("/", auth, async (req, res) => {
  try {
    const newItem = await Item.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(newItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---------------------------
// GET ALL ITEMS (Public - no token needed)
// ---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---------------------------
// GET ONLY USER ITEMS (Private)
// ---------------------------
router.get("/my", auth, async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---------------------------
// CLAIM ITEM (Only owner can mark as claimed)
// ---------------------------
router.put("/:id/claim", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });

    // Only the item owner can update claim status
    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    item.claimed = true;
    await item.save();

    res.json({ message: "Item marked as claimed", item });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;