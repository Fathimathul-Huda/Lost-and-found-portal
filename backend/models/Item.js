const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    location: String,
    category: { type: String, enum: ["Lost", "Found"] },
    image: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "Pending" },
    secretHint: {type:String}

  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
