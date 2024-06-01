const express = require('express');
const router = express.Router();
const roleController = require('../controller/role.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.post('/create', auth, checkRole('admin'), roleController.createRole);

router.get('/', roleController.getAllRoles);

router.put('/:id/update', auth, checkRole('admin'), roleController.updateRole);

router.delete('/:id/delete', auth, checkRole('admin'), roleController.deleteRole);

module.exports = router;
