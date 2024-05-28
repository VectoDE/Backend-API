const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'resolved'],
        default: 'open',
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
