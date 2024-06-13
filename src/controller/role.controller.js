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

const Role = require('../models/role.model');

exports.createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).send('Role already exists');
        }
        const newRole = new Role({ name });
        await newRole.save();
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).send('Error creating role');
    }
};

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).send('Error fetching roles');
    }
};

exports.updateRole = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!updatedRole) {
            return res.status(404).send('Role not found');
        }
        res.json(updatedRole);
    } catch (error) {
        res.status(500).send('Error updating role');
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).send('Role not found');
        }
        res.json(deletedRole);
    } catch (error) {
        res.status(500).send('Error deleting role');
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