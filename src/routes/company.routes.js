const express = require('express');
const router = express.Router();
const companyController = require('../controller/company.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.post('/create', auth, checkRole('admin'), companyController.createCompany);

router.get('/', companyController.getAllCompanies);

router.put('/:id/update', auth, checkRole('admin'), companyController.updateCompany);

router.delete('/:id/delete', auth, checkRole('admin'), companyController.deleteCompany);

module.exports = router;
