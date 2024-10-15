const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: { type: String, required: true },
  targetPrice: { type: Number, required: true, min: 0 },
  type: { type: String, enum: ["above", "below"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alert", AlertSchema);
