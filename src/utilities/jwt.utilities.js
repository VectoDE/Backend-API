const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');

module.exports = {
    sign: (payload, options = {}) => {
        return jwt.sign(payload, appConfig.JWT_SECRET, options);
    },

    verify: (token) => {
        return jwt.verify(token, appConfig.JWT_SECRET);
    }
};
