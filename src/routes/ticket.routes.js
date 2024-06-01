const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticket.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.post('/create', auth, ticketController.createTicket);

router.get('/', auth, checkRole('admin'), ticketController.getAllTickets);

router.put('/:id/update', auth, ticketController.updateTicket);

router.delete('/:id/delete', auth, checkRole('admin'), ticketController.deleteTicket);

module.exports = router;
