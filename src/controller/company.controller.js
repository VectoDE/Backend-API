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

const Company = require('../models/company.model');

exports.createCompany = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            return res.status(400).send('Company already exists');
        }
        const newCompany = new Company({ name });
        await newCompany.save();
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(500).send('Error creating company');
    }
};

exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(500).send('Error fetching companies');
    }
};

exports.updateCompany = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!updatedCompany) {
            return res.status(404).send('Company not found');
        }
        res.json(updatedCompany);
    } catch (error) {
        res.status(500).send('Error updating company');
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(req.params.id);
        if (!deletedCompany) {
            return res.status(404).send('Company not found');
        }
        res.json(deletedCompany);
    } catch (error) {
        res.status(500).send('Error deleting company');
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