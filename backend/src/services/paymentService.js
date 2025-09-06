const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Razorpay = require('razorpay');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class PaymentService {
  // Stripe Payment Methods
  static async createStripePaymentIntent(amount, currency = 'usd', metadata = {}) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      console.error('Stripe payment intent creation error:', error);
      throw error;
    }
  }

  static async confirmStripePayment(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      console.error('Stripe payment confirmation error:', error);
      throw error;
    }
  }

  static async refundStripePayment(paymentIntentId, amount = null) {
    try {
      const refundData = {
        payment_intent: paymentIntentId,
      };

      if (amount) {
        refundData.amount = Math.round(amount * 100); // Convert to cents
      }

      const refund = await stripe.refunds.create(refundData);
      return refund;
    } catch (error) {
      console.error('Stripe refund error:', error);
      throw error;
    }
  }

  static async createStripeCustomer(email, name, metadata = {}) {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        metadata,
      });
      return customer;
    } catch (error) {
      console.error('Stripe customer creation error:', error);
      throw error;
    }
  }

  static async getStripeCustomer(customerId) {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      return customer;
    } catch (error) {
      console.error('Stripe customer retrieval error:', error);
      throw error;
    }
  }

  // Razorpay Payment Methods
  static async createRazorpayOrder(amount, currency = 'INR', receipt = '', notes = {}) {
    try {
      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // Convert to paise
        currency: currency.toUpperCase(),
        receipt,
        notes,
      });

      return order;
    } catch (error) {
      console.error('Razorpay order creation error:', error);
      throw error;
    }
  }

  static async verifyRazorpayPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
    try {
      const crypto = require('crypto');
      const body = razorpayOrderId + '|' + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      return expectedSignature === razorpaySignature;
    } catch (error) {
      console.error('Razorpay payment verification error:', error);
      throw error;
    }
  }

  static async getRazorpayPayment(paymentId) {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return payment;
    } catch (error) {
      console.error('Razorpay payment retrieval error:', error);
      throw error;
    }
  }

  static async refundRazorpayPayment(paymentId, amount = null) {
    try {
      const refundData = {};
      
      if (amount) {
        refundData.amount = Math.round(amount * 100); // Convert to paise
      }

      const refund = await razorpay.payments.refund(paymentId, refundData);
      return refund;
    } catch (error) {
      console.error('Razorpay refund error:', error);
      throw error;
    }
  }

  // General Payment Methods
  static calculateTax(amount, taxRate = 0.15) {
    return Number((amount * taxRate).toFixed(2));
  }

  static calculateShipping(amount, freeShippingThreshold = 100, shippingRate = 15) {
    return amount >= freeShippingThreshold ? 0 : shippingRate;
  }

  static formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  }

  // Webhook signature verification
  static verifyStripeWebhook(payload, signature, endpointSecret) {
    try {
      const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
      return event;
    } catch (error) {
      console.error('Stripe webhook verification error:', error);
      throw error;
    }
  }

  // Payment status mapping
  static mapPaymentStatus(status, provider) {
    const statusMapping = {
      stripe: {
        'succeeded': 'completed',
        'requires_payment_method': 'pending',
        'requires_confirmation': 'pending',
        'requires_action': 'pending',
        'processing': 'processing',
        'requires_capture': 'authorized',
        'canceled': 'cancelled',
      },
      razorpay: {
        'captured': 'completed',
        'authorized': 'authorized',
        'failed': 'failed',
        'refunded': 'refunded',
      }
    };

    return statusMapping[provider]?.[status] || 'unknown';
  }

  // Generate payment receipt
  static generatePaymentReceipt(orderId, amount, currency, paymentMethod) {
    const timestamp = new Date().toISOString();
    const receiptId = `RCP-${orderId}-${Date.now()}`;

    return {
      receiptId,
      orderId,
      amount,
      currency,
      paymentMethod,
      timestamp,
      formattedAmount: this.formatCurrency(amount, currency),
    };
  }

  // Validate payment amount
  static validatePaymentAmount(amount, minAmount = 0.5, maxAmount = 10000) {
    if (amount < minAmount) {
      throw new Error(`Minimum payment amount is ${this.formatCurrency(minAmount)}`);
    }

    if (amount > maxAmount) {
      throw new Error(`Maximum payment amount is ${this.formatCurrency(maxAmount)}`);
    }

    return true;
  }

  // Get supported currencies
  static getSupportedCurrencies() {
    return {
      stripe: ['usd', 'eur', 'gbp', 'cad', 'aud', 'jpy', 'inr'],
      razorpay: ['inr'],
    };
  }

  // Check if currency is supported
  static isCurrencySupported(currency, provider) {
    const supportedCurrencies = this.getSupportedCurrencies();
    return supportedCurrencies[provider]?.includes(currency.toLowerCase()) || false;
  }
}

module.exports = PaymentService;
