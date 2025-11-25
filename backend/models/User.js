const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const Item = require("../models/Item");

// ⭐ DO NOT CHANGE ANYTHING BELOW ⭐
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
// ⭐ END — EXACT CODE YOU WANTED ⭐

module.exports = router;

