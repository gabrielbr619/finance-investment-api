const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const paymentService = require("../services/paymentService");

const router = express.Router();

router.post("/create-checkout-session", authenticateToken, async (req, res) => {
  try {
    const session = await paymentService.createCheckoutSession(
      req.user.id,
      process.env.STRIPE_PRICE_ID
    );
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"];
      await paymentService.handleWebhook(req.body, sig);
      res.json({ received: true });
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }
);

module.exports = router;
