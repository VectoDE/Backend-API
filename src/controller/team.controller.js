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

const Team = require('../models/team.model');

exports.createTeam = async (req, res) => {
    try {
        const { name } = req.body;
        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).send('Team already exists');
        }
        const newTeam = new Team({ name });
        await newTeam.save();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).send('Error creating team');
    }
};

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).send('Error fetching teams');
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedTeam = await Team.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!updatedTeam) {
            return res.status(404).send('Team not found');
        }
        res.json(updatedTeam);
    } catch (error) {
        res.status(500).send('Error updating team');
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);
        if (!deletedTeam) {
            return res.status(404).send('Team not found');
        }
        res.json(deletedTeam);
    } catch (error) {
        res.status(500).send('Error deleting team');
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