const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.get('/:id', auth, checkRole('admin'), userController.getUser);

router.get('/', auth, userController.getAllUsers);

router.post('/create', checkRole('admin'), userController.createUser);

router.put('/:id/update', auth, checkRole('admin'), userController.updateUser);

router.delete('/:id/delete', auth, checkRole('admin'), userController.deleteUser);

module.exports = router;
