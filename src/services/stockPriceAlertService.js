// src/services/stockPriceAlertService.js

class StockPriceAlertService {
  constructor(stockDataService) {
    this.stockDataService = stockDataService;
    this.alerts = new Map();
  }

  setAlert(userId, symbol, targetPrice, type) {
    if (!this.alerts.has(userId)) {
      this.alerts.set(userId, []);
    }
    this.alerts.get(userId).push({ symbol, targetPrice, type });
  }

  async checkAlerts(userId) {
    const userAlerts = this.alerts.get(userId) || [];
    const triggeredAlerts = [];

    for (const alert of userAlerts) {
      try {
        const currentPrice = await this.stockDataService.getStockPrice(
          alert.symbol
        );
        if (
          (alert.type === "above" && currentPrice >= alert.targetPrice) ||
          (alert.type === "below" && currentPrice <= alert.targetPrice)
        ) {
          triggeredAlerts.push({
            symbol: alert.symbol,
            targetPrice: alert.targetPrice,
            currentPrice,
            type: alert.type,
          });
        }
      } catch (error) {
        console.error(`Erro ao verificar alerta para ${alert.symbol}:`, error);
      }
    }

    return triggeredAlerts;
  }
}

// Não exporte uma instância diretamente. Em vez disso, exporte a classe.
module.exports = StockPriceAlertService;
