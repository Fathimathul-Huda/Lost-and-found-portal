const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");
const upload = require("../Middleware/uploadmiddleware"); // if folder name is "Middleware", keep capital M

// ADD ITEM (with image upload)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const formattedCategory =
      req.body.category.charAt(0).toUpperCase() + req.body.category.slice(1).toLowerCase();

    const newItem = await Item.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      category: formattedCategory,
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

// GET ITEMS for Admin — only Pending
router.get("/", async (req, res) => {
  try {
    const items = await Item.find({ status: "Pending" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
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

// APPROVE ITEM
router.put("/approve/:id", auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

// REJECT ITEM
router.put("/reject/:id", auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    res.json(item);
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

// PUBLIC — Missing Items (Lost)
router.get("/public/missing", async (req, res) => {
  try {
    const items = await Item.find({
      category: { $regex: /^lost$/i },
      status: "Approved",
    });
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUBLIC — Found Items
router.get("/public/found", async (req, res) => {
  try {
    const items = await Item.find({
      category: { $regex: /^found$/i },
      status: "Approved",
    });
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// APPROVED ITEMS LIST (for claim page)
router.get("/approved", async (req, res) => {
  try {
    const items = await Item.find({ status: "Approved" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE ITEM (Only owner can delete)
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed to delete this item" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
