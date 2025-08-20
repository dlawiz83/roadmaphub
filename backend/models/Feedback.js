const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ["open", "reviewed", "converted"], default: "open" },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Feedback", feedbackSchema);
