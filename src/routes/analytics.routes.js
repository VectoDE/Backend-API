const express = require('express');
const router = express.Router();
const analyticsController = require('../controller/analytics.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.post('/track-event', auth, checkRole('admin'), analyticsController.trackEvent);

module.exports = router;
