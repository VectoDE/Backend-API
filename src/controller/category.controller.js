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

const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).send('Category already exists');
        }
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).send('Error creating category');
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Error fetching categories');
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).send('Category not found');
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).send('Error updating category');
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).send('Category not found');
        }
        res.json(deletedCategory);
    } catch (error) {
        res.status(500).send('Error deleting category');
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