const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
