const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notification.controller');

router.post('/send', notificationController.sendNotification);

module.exports = router;
