// src/utils/asyncHandler.js

/**
 * Wrapper para lidar com erros em funções assíncronas de rotas Express
 * @param {Function} fn Função assíncrona a ser envolvida
 * @returns {Function} Middleware do Express que trata erros automaticamente
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
