const express = require('express');
const router = express.Router();
const groupController = require('../controller/group.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.post('/create', auth, checkRole('admin'), groupController.createGroup);

router.get('/', groupController.getAllGroups);

router.put('/:id/update', auth, checkRole('admin'), groupController.updateGroup);

router.delete('/:id/delete', auth, checkRole('admin'), groupController.deleteGroup);

module.exports = router;
