const stripe = require('stripe')('your_stripe_secret_key');
const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'your_paypal_client_id',
    client_secret: 'your_paypal_client_secret'
});

const paymentGatewayService = {
    async processStripePayment(paymentDetails) {
        try {
            const stripePayment = await stripe.charges.create({
                amount: paymentDetails.amount,
                currency: 'usd',
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
                    intent: 'sale',
                    payer: {
                        payment_method: 'paypal'
                    },
                    transactions: [{
                        amount: {
                            total: paymentDetails.amount,
                            currency: 'USD'
                        },
                        description: paymentDetails.description
                    }],
                    redirect_urls: {
                        return_url: 'http://localhost:3000/payment/success',
                        cancel_url: 'http://localhost:3000/payment/cancel'
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
