// src/services/investmentStrategySimulationService.js
class InvestmentStrategySimulationService {
  simulateStrategy(
    initialInvestment,
    monthlyContribution,
    years,
    annualReturn
  ) {
    let totalValue = initialInvestment;
    const results = [];

    for (let i = 1; i <= years * 12; i++) {
      totalValue += monthlyContribution;
      totalValue *= 1 + annualReturn / 12;

      if (i % 12 === 0) {
        results.push({
          year: i / 12,
          value: totalValue,
        });
      }
    }

    return results;
  }
}

module.exports = new InvestmentStrategySimulationService();
