const express = require('express');
const router = express.Router();
const roleController = require('../controller/role.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.post('/', auth, checkRole('admin'), roleController.createRole);

router.get('/', roleController.getAllRoles);

router.put('/:id', auth, checkRole('admin'), roleController.updateRole);

router.delete('/:id', auth, checkRole('admin'), roleController.deleteRole);

module.exports = router;
