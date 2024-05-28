const express = require('express');
const router = express.Router();
const paymentGatewayController = require('../controller/paymentGateway.controller');
const auth = require('../middleware/authentication.middleware');

router.post('/stripe-payment', auth, paymentGatewayController.processStripePayment);

router.post('/paypal-payment', auth, paymentGatewayController.processPayPalPayment);

module.exports = router;
