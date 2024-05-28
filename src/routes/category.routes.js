const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.post('/create', auth, checkRole('admin'), categoryController.createCategory);

router.get('/', categoryController.getAllCategories);

router.put('/:id/update', auth, checkRole('admin'), categoryController.updateCategory);

router.delete('/:id/delete', auth, checkRole('admin'), categoryController.deleteCategory);

module.exports = router;
