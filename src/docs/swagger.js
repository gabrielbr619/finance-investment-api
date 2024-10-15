// src/docs/swaggerSchemas.js

/**
 * @swagger
 * components:
 *   schemas:
 *     ROICalculation:
 *       type: object
 *       required:
 *         - initialInvestment
 *         - finalValue
 *         - years
 *       properties:
 *         initialInvestment:
 *           type: number
 *           description: Valor inicial do investimento
 *         finalValue:
 *           type: number
 *           description: Valor final do investimento
 *         years:
 *           type: number
 *           description: Número de anos do investimento
 *
 *     ROIResult:
 *       type: object
 *       properties:
 *         roi:
 *           type: number
 *           description: Retorno sobre o investimento em porcentagem
 *         annualizedROI:
 *           type: number
 *           description: ROI anualizado em porcentagem
 *
 *     Portfolio:
 *       type: object
 *       additionalProperties:
 *         type: object
 *         properties:
 *           quantity:
 *             type: integer
 *             minimum: 1
 *             description: Quantidade de ações
 *           purchasePrice:
 *             type: number
 *             minimum: 0
 *             description: Preço de compra por ação
 *
 *     PortfolioAnalysis:
 *       type: object
 *       properties:
 *         diversificationScore:
 *           type: number
 *           description: Pontuação de diversificação do portfólio (0-100)
 *         sectorAllocation:
 *           type: object
 *           additionalProperties:
 *             type: number
 *           description: Alocação por setor em porcentagem
 *         riskAssessment:
 *           type: string
 *           enum: [Low, Medium, High]
 *           description: Avaliação geral de risco do portfólio
 *
 *     Allocation:
 *       type: object
 *       additionalProperties:
 *         type: number
 *         minimum: 0
 *         maximum: 100
 *       description: Alocação de ativos, onde as chaves são símbolos de ações e os valores são porcentagens
 *
 *     RebalancingRecommendation:
 *       type: object
 *       properties:
 *         actions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *               action:
 *                 type: string
 *                 enum: [Buy, Sell, Hold]
 *               percentage:
 *                 type: number
 *                 description: Porcentagem a comprar ou vender
 *         expectedAllocation:
 *           $ref: '#/components/schemas/Allocation'
 *
 *     StockData:
 *       type: object
 *       properties:
 *         symbol:
 *           type: string
 *         companyName:
 *           type: string
 *         price:
 *           type: number
 *         change:
 *           type: number
 *         changePercent:
 *           type: number
 *         marketCap:
 *           type: number
 *         volume:
 *           type: integer
 *         peRatio:
 *           type: number
 *         dividendYield:
 *           type: number
 *
 *     SimulationParams:
 *       type: object
 *       required:
 *         - initialInvestment
 *         - monthlyContribution
 *         - years
 *         - annualReturn
 *       properties:
 *         initialInvestment:
 *           type: number
 *           minimum: 0
 *         monthlyContribution:
 *           type: number
 *           minimum: 0
 *         years:
 *           type: integer
 *           minimum: 1
 *         annualReturn:
 *           type: number
 *
 *     SimulationResult:
 *       type: object
 *       properties:
 *         finalBalance:
 *           type: number
 *         totalContributions:
 *           type: number
 *         totalEarnings:
 *           type: number
 *         yearByYearBreakdown:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               year:
 *                 type: integer
 *               balance:
 *                 type: number
 *               contributions:
 *                 type: number
 *               earnings:
 *                 type: number
 *
 *     Alert:
 *       type: object
 *       required:
 *         - userId
 *         - symbol
 *         - targetPrice
 *         - type
 *       properties:
 *         userId:
 *           type: string
 *         symbol:
 *           type: string
 *         targetPrice:
 *           type: number
 *           minimum: 0
 *         type:
 *           type: string
 *           enum: [above, below]
 *
 *     TriggeredAlert:
 *       type: object
 *       properties:
 *         symbol:
 *           type: string
 *         targetPrice:
 *           type: number
 *         currentPrice:
 *           type: number
 *         type:
 *           type: string
 *           enum: [above, below]
 *         triggeredAt:
 *           type: string
 *           format: date-time
 *
 * paths:
 *   /api/stock-analysis/calculate-roi:
 *     post:
 *       summary: Calcula o ROI e ROI anualizado
 *       tags: [Análise de Investimentos]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ROICalculation'
 *       responses:
 *         200:
 *           description: Cálculo de ROI bem-sucedido
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ROIResult'
 *
 *   /api/stock-analysis/analyze-portfolio:
 *     post:
 *       summary: Analisa a diversificação do portfólio
 *       tags: [Gestão de Portfólio]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 portfolio:
 *                   $ref: '#/components/schemas/Portfolio'
 *       responses:
 *         200:
 *           description: Análise de portfólio bem-sucedida
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/PortfolioAnalysis'
 *
 *   /api/stock-analysis/rebalance-portfolio:
 *     post:
 *       summary: Fornece recomendações para rebalanceamento do portfólio
 *       tags: [Gestão de Portfólio]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentAllocation:
 *                   $ref: '#/components/schemas/Allocation'
 *                 targetAllocation:
 *                   $ref: '#/components/schemas/Allocation'
 *       responses:
 *         200:
 *           description: Recomendações de rebalanceamento geradas com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/RebalancingRecommendation'
 *
 *   /api/stock-analysis/stock/{symbol}:
 *     get:
 *       summary: Obtém dados de uma ação específica
 *       tags: [Dados de Ações]
 *       parameters:
 *         - in: path
 *           name: symbol
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Dados da ação recuperados com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/StockData'
 *
 *   /api/stock-analysis/stocks:
 *     post:
 *       summary: Obtém dados de múltiplas ações
 *       tags: [Dados de Ações]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbols:
 *                   type: array
 *                   items:
 *                     type: string
 *       responses:
 *         200:
 *           description: Dados de múltiplas ações recuperados com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/StockData'
 *
 *   /api/stock-analysis/simulate-strategy:
 *     post:
 *       summary: Simula uma estratégia de investimento
 *       tags: [Simulações de Investimento]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimulationParams'
 *       responses:
 *         200:
 *           description: Simulação de estratégia bem-sucedida
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SimulationResult'
 *
 *   /api/stock-analysis/set-alert:
 *     post:
 *       summary: Define um alerta de preço para uma ação
 *       tags: [Alertas]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alert'
 *       responses:
 *         200:
 *           description: Alerta definido com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *
 *   /api/stock-analysis/check-alerts/{userId}:
 *     get:
 *       summary: Verifica alertas acionados para um usuário
 *       tags: [Alertas]
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Alertas verificados com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/TriggeredAlert'
 */

// Este arquivo não exporta nada. É usado apenas para documentação Swagger.
