//|------------------------------------------------------------------------------------|
//|                                                                                    |
//|                                                                                    |
//|                                     CREATOR                                        |
//|                                                                                    |
//|                                Vecto. (Tim Hauke)                                  |
//|                                                                                    |
//|                                                                                    |
//|                                    FRAMEWORKS                                      |
//|                                                                                    |
//|                                    Express.js                                      |
//|                                    BodyParser                                      |
//|                                      Bcrypt                                        |
//|                                   JSONWebToken                                     |
//|                                                                                    |
//|                                                                                    |
//|                                Copyright (c) 2024                                  |
//|                                                                                    |
//|                                                                                    |
//|------------------------------------------------------------------------------------|

const stripe = require('stripe')('your_stripe_secret_key');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: process.env.PAYPAL_MODE,
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
});

const paymentGatewayService = {
    async processStripePayment(paymentDetails) {
        try {
            const stripePayment = await stripe.charges.create({
                amount: paymentDetails.amount,
                currency: process.env.PAYMENT_GATEWAY_CURRENCY,
                source: paymentDetails.token,
                description: paymentDetails.description
            });
            return stripePayment;
        } catch (error) {
            throw new Error('Fehler bei der Verarbeitung der Stripe-Zahlung: ' + error.message);
        }
    },
    async processPayPalPayment(paymentDetails) {
        try {
            const paypalPayment = await new Promise((resolve, reject) => {
                const paymentData = {
                    intent: process.env.PAYMENTDATA_INTENT,
                    payer: {
                        payment_method: process.env.PAYER_PAYMENT_METHOD
                    },
                    transactions: [{
                        amount: {
                            total: paymentDetails.amount,
                            currency: process.env.PAYMENT_GATEWAY_CURRENCY
                        },
                        description: paymentDetails.description
                    }],
                    redirect_urls: {
                        return_url: process.env.REDIRECT_URLS_RETURN_URL,
                        cancel_url: process.env.REDIRECT_URLS_CANCEL_URL
                    }
                };

                paypal.payment.create(paymentData, (error, payment) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(payment);
                    }
                });
            });
            return paypalPayment;
        } catch (error) {
            throw new Error('Fehler bei der Verarbeitung der PayPal-Zahlung: ' + error.message);
        }
    }
};

module.exports = paymentGatewayService;

//|------------------------------------------------------------------------------------|
//|                                                                                    |
//|                                                                                    |
//|                                     CREATOR                                        |
//|                                                                                    |
//|                                Vecto. (Tim Hauke)                                  |
//|                                                                                    |
//|                                                                                    |
//|                                    FRAMEWORKS                                      |
//|                                                                                    |
//|                                    Express.js                                      |
//|                                    BodyParser                                      |
//|                                      Bcrypt                                        |
//|                                   JSONWebToken                                     |
//|                                                                                    |
//|                                                                                    |
//|                                Copyright (c) 2024                                  |
//|                                                                                    |
//|                                                                                    |
//|------------------------------------------------------------------------------------|