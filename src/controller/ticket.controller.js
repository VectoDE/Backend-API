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

const Ticket = require('../models/ticket.model');

exports.createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTicket = new Ticket({ title, description });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).send('Error creating ticket');
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).send('Error fetching tickets');
    }
};

exports.updateTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).send('Ticket not found');
        }
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).send('Error updating ticket');
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) {
            return res.status(404).send('Ticket not found');
        }
        res.json(deletedTicket);
    } catch (error) {
        res.status(500).send('Error deleting ticket');
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