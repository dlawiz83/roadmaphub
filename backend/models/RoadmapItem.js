const mongoose = require("mongoose");

const roadmapItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["planned", "in progress", "completed"], default: "planned" },
    category: { type: String },
    feedbackRef: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RoadmapItem", roadmapItemSchema);
