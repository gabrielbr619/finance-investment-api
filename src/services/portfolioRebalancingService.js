class PortfolioRebalancingService {
  recommendRebalancing(currentAllocation, targetAllocation) {
    const recommendations = {};

    for (const asset in targetAllocation) {
      const currentPercentage = currentAllocation[asset] || 0;
      const targetPercentage = targetAllocation[asset];
      const difference = targetPercentage - currentPercentage;

      if (Math.abs(difference) > 5) {
        // 5% tolerance
        recommendations[asset] = difference > 0 ? "Buy" : "Sell";
      }
    }

    return recommendations;
  }
}

module.exports = new PortfolioRebalancingService();
