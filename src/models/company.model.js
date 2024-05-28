const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    industry: {
        type: String,
        required: true,
    },
    foundedYear: {
        type: Number,
        required: true,
    },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
