const express = require('express');
const router = express.Router();
const tagController = require('../controller/tag.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.post('/create', auth, checkRole('admin'), tagController.createTag);

router.get('/', tagController.getAllTags);

router.put('/:id/update', auth, checkRole('admin'), tagController.updateTag);

router.delete('/:id/delete', auth, checkRole('admin'), tagController.deleteTag);

module.exports = router;
