// src/app.js
require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const errorHandler = require("./middleware/errorHandler");
const apiLimiter = require("./middleware/rateLimiter");

const stockAnalysisRoutes = require("./routes/stockAnalysis");
const authRoutes = require("./routes/auth");
const swaggerConfig = require("./swaggerConfig");

const app = express();
const port = process.env.PORT || 3001;

// Configuração do Mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/", apiLimiter);

// Rotas
app.use("/api-docs", swaggerConfig.serve, swaggerConfig.setup);
app.use("/api/auth", authRoutes);
app.use("/api/stock-analysis", stockAnalysisRoutes);

// Error handling middleware (deve ser o último middleware)
app.use(errorHandler);

// Tratamento de rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Inicialização do servidor
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(
        `Documentação Swagger disponível em http://localhost:${port}/api-docs`
      );
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

// Tratamento de erros não capturados
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Aplicação deve ser encerrada e reiniciada
});

module.exports = app; // Para testes
