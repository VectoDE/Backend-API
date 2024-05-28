const express = require('express');
const router = express.Router();
const teamController = require('../controller/team.controller');
const auth = require('../middleware/authentication.middleware');
const checkRole = require('../middleware/checkRole.middleware');

router.post('/create', auth, checkRole('admin'), teamController.createTeam);

router.get('/', teamController.getAllTeams);

router.put('/:id/update', auth, checkRole('admin'), teamController.updateTeam);

router.delete('/:id/delete', auth, checkRole('admin'), teamController.deleteTeam);

module.exports = router;
