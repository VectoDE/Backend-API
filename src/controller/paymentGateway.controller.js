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

const paymentGatewayService = require('../services/paymentGateway.service');

exports.processStripePayment = async (req, res) => {
    try {
        const paymentDetails = req.body;
        const stripePayment = await paymentGatewayService.processStripePayment(paymentDetails);
        res.status(200).json(stripePayment);
    } catch (error) {
        console.error('Fehler bei der Verarbeitung der Stripe-Zahlung:', error);
        res.status(500).json({ error: 'Fehler bei der Verarbeitung der Stripe-Zahlung' });
    }
};

exports.processPayPalPayment = async (req, res) => {
    try {
        const paymentDetails = req.body;
        const paypalPayment = await paymentGatewayService.processPayPalPayment(paymentDetails);
        res.status(200).json(paypalPayment);
    } catch (error) {
        console.error('Fehler bei der Verarbeitung der PayPal-Zahlung:', error);
        res.status(500).json({ error: 'Fehler bei der Verarbeitung der PayPal-Zahlung' });
    }
};

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