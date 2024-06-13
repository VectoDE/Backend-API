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

const Tag = require('../models/tag.model');

exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const existingTag = await Tag.findOne({ name });
        if (existingTag) {
            return res.status(400).send('Tag already exists');
        }
        const newTag = new Tag({ name });
        await newTag.save();
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).send('Error creating tag');
    }
};

exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.status(500).send('Error fetching tags');
    }
};

exports.updateTag = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedTag = await Tag.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!updatedTag) {
            return res.status(404).send('Tag not found');
        }
        res.json(updatedTag);
    } catch (error) {
        res.status(500).send('Error updating tag');
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const deletedTag = await Tag.findByIdAndDelete(req.params.id);
        if (!deletedTag) {
            return res.status(404).send('Tag not found');
        }
        res.json(deletedTag);
    } catch (error) {
        res.status(500).send('Error deleting tag');
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