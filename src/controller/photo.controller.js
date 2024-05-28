const Photo = require('../models/photo.model');
const fs = require('fs');
const path = require('path');

exports.uploadPhoto = async (req, res) => {
    try {
        const photo = new Photo({
            filename: req.file.filename,
            path: req.file.path,
            userId: req.user.id,
        });

        await photo.save();
        res.status(201).send('Photo uploaded successfully');
    } catch (error) {
        res.status(400).send('Error uploading photo');
    }
};

exports.getPhotosByUser = async (req, res) => {
    try {
        const photos = await Photo.find({ userId: req.user.id });
        res.status(200).json(photos);
    } catch (error) {
        res.status(400).send('Error fetching photos');
    }
};

exports.updatePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findById(id);

        if (!photo) {
            return res.status(404).send('Photo not found');
        }

        if (photo.userId.toString() !== req.user.id) {
            return res.status(403).send('Not authorized to update this photo');
        }

        if (req.file) {
            fs.unlinkSync(photo.path);
            photo.filename = req.file.filename;
            photo.path = req.file.path;
        }

        await photo.save();
        res.status(200).send('Photo updated successfully');
    } catch (error) {
        res.status(400).send('Error updating photo');
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        const photo = await Photo.findById(id);

        if (!photo) {
            return res.status(404).send('Photo not found');
        }

        if (photo.userId.toString() !== req.user.id) {
            return res.status(403).send('Not authorized to delete this photo');
        }
        
        fs.unlinkSync(photo.path);
        await photo.remove();
        res.status(200).send('Photo deleted successfully');
    } catch (error) {
        res.status(400).send('Error deleting photo');
    }
};
