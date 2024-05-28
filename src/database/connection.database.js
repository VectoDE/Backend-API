const mongoose = require('mongoose');
const { MONGODB_URL } = require('../config/db.config');

mongoose.connect(MONGODB_URL, { })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
