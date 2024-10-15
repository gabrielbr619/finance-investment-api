const mongoose = require("mongoose");

const SimulationResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  initialInvestment: { type: Number, required: true, min: 0 },
  monthlyContribution: { type: Number, required: true, min: 0 },
  years: { type: Number, required: true, min: 1 },
  annualReturn: { type: Number, required: true },
  finalBalance: { type: Number, required: true },
  totalContributions: { type: Number, required: true },
  totalEarnings: { type: Number, required: true },
  yearByYearBreakdown: [
    {
      year: { type: Number, required: true },
      balance: { type: Number, required: true },
      contributions: { type: Number, required: true },
      earnings: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SimulationResult", SimulationResultSchema);
