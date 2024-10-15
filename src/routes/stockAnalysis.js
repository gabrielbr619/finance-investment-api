const express = require("express");
const {
  BrazilianStockScraperService,
} = require("../services/brazilianStockScraperService");
const { CacheService } = require("../services/cacheService");
const roiCalculationService = require("../services/roiCalculationService");
const portfolioDiversificationService = require("../services/portfolioDiversificationService");
const portfolioRebalancingService = require("../services/portfolioRebalancingService");
const investmentStrategySimulationService = require("../services/investmentStrategySimulationService");
const stockPriceAlertService = require("../services/stockPriceAlertService");
const { authenticateToken, isPremium } = require("../middleware/auth");
const {
  validateStock,
  validateStocks,
  validateROICalculation,
  validatePortfolio,
  validateRebalancing,
  validateSimulation,
  validateAlert,
} = require("../middleware/validation");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();
const stockScraperService = new BrazilianStockScraperService();
const cacheService = new CacheService(300); // 5 minutes cache

router.post(
  "/calculate-roi",
  authenticateToken,
  validateROICalculation,
  asyncHandler(async (req, res) => {
    const { initialInvestment, finalValue, years } = req.body;
    const roi = roiCalculationService.calculateROI(
      initialInvestment,
      finalValue
    );
    const annualizedROI = roiCalculationService.calculateAnnualizedROI(
      initialInvestment,
      finalValue,
      years
    );
    res.json({ roi, annualizedROI });
  })
);

router.post(
  "/analyze-portfolio",
  authenticateToken,
  validatePortfolio,
  asyncHandler(async (req, res) => {
    const { portfolio } = req.body;
    const analysis =
      await portfolioDiversificationService.analyzeDiversification(portfolio);
    res.json(analysis);
  })
);

router.post(
  "/rebalance-portfolio",
  authenticateToken,
  validateRebalancing,
  asyncHandler(async (req, res) => {
    const { currentAllocation, targetAllocation } = req.body;
    const recommendations =
      await portfolioRebalancingService.recommendRebalancing(
        currentAllocation,
        targetAllocation
      );
    res.json(recommendations);
  })
);

router.get(
  "/stock/:symbol",
  authenticateToken,
  validateStock,
  asyncHandler(async (req, res) => {
    const { symbol } = req.params;
    const cachedData = cacheService.get(symbol);

    if (cachedData) {
      return res.json(cachedData);
    }

    const stockData = await stockScraperService.getStockData(symbol);
    cacheService.set(symbol, stockData);
    res.json(stockData);
  })
);

router.post(
  "/stocks",
  authenticateToken,
  isPremium,
  validateStocks,
  asyncHandler(async (req, res) => {
    const { symbols } = req.body;
    const cachedData = symbols
      .map((symbol) => cacheService.get(symbol))
      .filter(Boolean);
    const missingSymbols = symbols.filter(
      (symbol) => !cacheService.get(symbol)
    );

    let fetchedData = [];
    if (missingSymbols.length > 0) {
      fetchedData = await stockScraperService.getMultipleStocksData(
        missingSymbols
      );
      fetchedData.forEach((data) => cacheService.set(data.symbol, data));
    }

    const allData = [...cachedData, ...fetchedData];
    res.json(allData);
  })
);

router.post(
  "/simulate-strategy",
  authenticateToken,
  validateSimulation,
  asyncHandler(async (req, res) => {
    const { initialInvestment, monthlyContribution, years, annualReturn } =
      req.body;
    const simulation =
      await investmentStrategySimulationService.simulateStrategy(
        initialInvestment,
        monthlyContribution,
        years,
        annualReturn
      );
    res.json(simulation);
  })
);

router.post(
  "/set-alert",
  authenticateToken,
  validateAlert,
  asyncHandler(async (req, res) => {
    const { userId, symbol, targetPrice, type } = req.body;
    await stockPriceAlertService.setAlert(userId, symbol, targetPrice, type);
    res.json({ message: "Alert set successfully" });
  })
);

router.get(
  "/check-alerts/:userId",
  authenticateToken,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const triggeredAlerts = await stockPriceAlertService.checkAlerts(userId);
    res.json(triggeredAlerts);
  })
);

module.exports = router;
