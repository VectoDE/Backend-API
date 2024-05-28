const express = require('express');
const router = express.Router();
const authenticationController = require('../controller/authentication.controller');

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);
router.post('/logout', authenticationController.logout);

module.exports = router;
