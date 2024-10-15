// ../services/roiCalculationService.js

const roiCalculationService = {
  calculateROI(initialInvestment, finalValue) {
    return ((finalValue - initialInvestment) / initialInvestment) * 100;
  },

  calculateAnnualizedROI(initialInvestment, finalValue, years) {
    const totalReturn = (finalValue - initialInvestment) / initialInvestment;
    return (Math.pow(1 + totalReturn, 1 / years) - 1) * 100;
  },
};

module.exports = roiCalculationService;
