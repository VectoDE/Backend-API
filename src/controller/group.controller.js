const Group = require('../models/group.model');

exports.createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const existingGroup = await Group.findOne({ name });
        if (existingGroup) {
            return res.status(400).send('Group already exists');
        }
        const newGroup = new Group({ name });
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).send('Error creating group');
    }
};

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (error) {
        res.status(500).send('Error fetching groups');
    }
};

exports.updateGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!updatedGroup) {
            return res.status(404).send('Group not found');
        }
        res.json(updatedGroup);
    } catch (error) {
        res.status(500).send('Error updating group');
    }
};

exports.deleteGroup = async (req, res) => {
    try {
        const deletedGroup = await Group.findByIdAndDelete(req.params.id);
        if (!deletedGroup) {
            return res.status(404).send('Group not found');
        }
        res.json(deletedGroup);
    } catch (error) {
        res.status(500).send('Error deleting group');
    }
};
