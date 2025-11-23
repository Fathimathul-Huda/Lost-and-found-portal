const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const adminMiddleware = require("../Middleware/Adminmiddleware");
const Item = require("../models/Item");
const router = express.Router();

// Create item
router.post("/add", authMiddleware, async (req, res) => {
  const { title, description, location, category } = req.body;

  const item = await Item.create({
    title,
    description,
    location,
    category,
    userId: req.user.id
  });

  res.json({ message: "Item submitted for review", item });
});

// Fetch all pending items (Admin only)
router.get("/pending", authMiddleware, adminMiddleware, async (req, res) => {
  const items = await Item.find({ status: "Pending" });
  res.json(items);
});

// APPROVE item (Admin only)
router.put("/approve/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, { status: "Approved" });
  res.json({ message: "Item Approved" });
});

// REJECT / DELETE item (Admin only)
router.delete("/reject/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item rejected and deleted" });
});

// Edit Item (Only owner)
router.put("/edit/:id", authMiddleware, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) return res.status(404).json({ message: "Item not found" });
  if (item.userId.toString() !== req.user.id)
    return res.status(403).json({ message: "Only owner can edit item" });

  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Item updated successfully" });
});

// Delete Item (Owner or Admin)
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) return res.status(404).json({ message: "Item not found" });

  if (item.userId.toString() !== req.user.id && req.user.role !== "Admin")
    return res.status(403).json({ message: "Not authorized to delete" });

  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted successfully" });
});

// Fetch all approved items (public)
router.get("/all", async (req, res) => {
  const items = await Item.find({ status: "Approved" });
  res.json(items);
});

// Fetch user items
router.get("/myItems", authMiddleware, async (req, res) => {
  const items = await Item.find({ userId: req.user.id });
  res.json(items);
});

module.exports = router;
