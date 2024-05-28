const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication.middleware');
const upload = require('../services/upload.service');
const photoController = require('../controller/photo.controller');

router.post('/upload', auth, upload.single('photo'), photoController.uploadPhoto);
router.get('/user/photos', auth, photoController.getPhotosByUser);
router.put('/update/:id', auth, upload.single('photo'), photoController.updatePhoto);
router.delete('/delete/:id', auth, photoController.deletePhoto);

module.exports = router;
