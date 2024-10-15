const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stocks: [
    {
      symbol: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      purchasePrice: { type: Number, required: true, min: 0 },
    },
  ],
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
