class PortfolioDiversificationService {
  analyzeDiversification(portfolio) {
    const sectorAllocation = {};
    let totalValue = 0;

    portfolio.forEach((stock) => {
      totalValue += stock.value;
      if (sectorAllocation[stock.sector]) {
        sectorAllocation[stock.sector] += stock.value;
      } else {
        sectorAllocation[stock.sector] = stock.value;
      }
    });

    const diversificationScore =
      Object.keys(sectorAllocation).length / portfolio.length;
    const sectorPercentages = {};

    for (const sector in sectorAllocation) {
      sectorPercentages[sector] = (sectorAllocation[sector] / totalValue) * 100;
    }

    return { diversificationScore, sectorPercentages };
  }
}

module.exports = new PortfolioDiversificationService();
