// src/middleware/validation.js
const Joi = require("joi");

const validateStock = (req, res, next) => {
  const schema = Joi.object({
    symbol: Joi.string().required().max(10),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateStocks = (req, res, next) => {
  const schema = Joi.object({
    symbols: Joi.array().items(Joi.string().max(10)).min(1).max(20).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please include a valid email",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => ({
      param: detail.path[0],
      msg: detail.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.base": "Username should be a text",
      "string.alphanum": "Username should only contain alphanumeric characters",
      "string.min": "Username should have a minimum length of 3",
      "string.max": "Username should have a maximum length of 30",
      "any.required": "Username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email",
      "any.required": "Email is required",
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Password should be between 3 to 30 characters and contain only alphanumeric characters",
        "any.required": "Password is required",
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => ({
      param: detail.path[0],
      msg: detail.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};

const validateROICalculation = (req, res, next) => {
  const schema = Joi.object({
    initialInvestment: Joi.number().positive().required(),
    finalValue: Joi.number().positive().required(),
    years: Joi.number().positive().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validatePortfolio = (req, res, next) => {
  const schema = Joi.object({
    portfolio: Joi.object()
      .pattern(
        Joi.string(), // chave (símbolo da ação)
        Joi.object({
          quantity: Joi.number().integer().min(1).required(),
          purchasePrice: Joi.number().positive().required(),
        })
      )
      .min(1)
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateRebalancing = (req, res, next) => {
  const allocationSchema = Joi.object()
    .pattern(
      Joi.string(), // chave (símbolo da ação)
      Joi.number().min(0).max(100).required()
    )
    .required();

  const schema = Joi.object({
    currentAllocation: allocationSchema,
    targetAllocation: allocationSchema,
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateSimulation = (req, res, next) => {
  const schema = Joi.object({
    initialInvestment: Joi.number().min(0).required(),
    monthlyContribution: Joi.number().min(0).required(),
    years: Joi.number().positive().integer().required(),
    annualReturn: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateAlert = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    symbol: Joi.string().required(),
    targetPrice: Joi.number().positive().required(),
    type: Joi.string().valid("above", "below").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateStock,
  validateStocks,
  validateLogin,
  validateRegister,
  validateROICalculation,
  validatePortfolio,
  validateRebalancing,
  validateSimulation,
  validateAlert,
};
