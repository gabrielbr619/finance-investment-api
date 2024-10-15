// src/services/paymentService.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  async createCheckoutSession(userId, priceId) {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      client_reference_id: userId,
    });

    return session;
  }

  async handleWebhook(payload, sig) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      await this.fulfillSubscription(session);
    }

    return { received: true };
  }

  async fulfillSubscription(session) {
    const userId = session.client_reference_id;
    const subscriptionId = session.subscription;

    // Atualize o usuário para premium
    await User.findByIdAndUpdate(userId, {
      isPremium: true,
      premiumUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias a partir de agora
    });
  }
}

module.exports = new PaymentService();
