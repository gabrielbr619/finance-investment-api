// src/services/brazilianStockScraperService.js
const axios = require("axios");
const cheerio = require("cheerio");

class BrazilianStockScraperService {
  async fetchHtml(url) {
    const { data } = await axios.get(url);
    return data;
  }

  extractNumber(value) {
    return parseFloat(value.replace(",", ".").replace(/[^\d.-]/g, ""));
  }

  async getStockData(symbol) {
    try {
      const url = `https://www.infomoney.com.br/${symbol}`;
      const html = await this.fetchHtml(url);
      const $ = cheerio.load(html);

      const price = this.extractNumber($(".value").first().text());
      const change = this.extractNumber($(".percentage").first().text());

      const extractData = (selector) => {
        return this.extractNumber($(selector).text());
      };

      const extractTableData = (label) => {
        const item = $(".tables table tr").filter((_, el) =>
          $(el).find("td").first().text().includes(label)
        );
        return this.extractNumber(item.find("td").last().text());
      };

      return {
        symbol,
        companyName: $("h1").first().text().trim(),
        price,
        change,
        previousClose: extractTableData("Fechamento anterior"),
        open: extractTableData("Abertura"),
        dayLow: extractData(".minimo p"),
        dayHigh: extractData(".maximo p"),
        volume: extractData(".volume p"),
        marketCap: extractTableData("Valor de mercado"),
        peRatio: extractTableData("P/L"),
        earningsPerShare: extractTableData("LPA"),
        dividendYield: extractTableData("Dividend Yield"),
        netRevenue: extractTableData("Receita Líquida"),
        netIncome: extractTableData("Lucro Líquido (LL)"),
        netMargin: extractTableData("Margem Líquida"),
        ebitda: extractTableData("Ebitda"),
        ebitdaMargin: extractTableData("Margem Ebitda"),
        totalAssets: extractTableData("Ativo Total"),
        netDebt: extractTableData("Dívida Líquida"),
        equity: extractTableData("Patrimônio Líquido (PL)"),
        returnOnEquity: extractTableData("Retorno sobre o PL (ROE)"),
        returnOnInvestedCapital: extractTableData(
          "Retorno sobre o Capital (ROIC)"
        ),
      };
    } catch (error) {
      console.error("Error scraping Brazilian stock data:", error);
      throw new Error("Failed to scrape Brazilian stock data");
    }
  }

  async getMultipleStocksData(symbols) {
    const promises = symbols.map((symbol) => this.getStockData(symbol));
    return Promise.all(promises);
  }
}

module.exports = { BrazilianStockScraperService };
