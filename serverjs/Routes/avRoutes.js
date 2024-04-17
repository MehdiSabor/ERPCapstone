const express = require('express');
const router = express.Router();
const avoirController = require('../controllers/avoirController');

// Create a new avoir
router.post('/createavoir', avoirController.createAvoirController);

// Validate an avoir
router.post('/validate/:refAvoir', avoirController.validateAvoirController);

// Get a single avoir by its ID
router.get('/avoir/:id', avoirController.getAvoirByIdController);

// Update an avoir by its ID
router.put('/updateavoir/:id', avoirController.updateAvoirController);

// Delete an avoir by its ID
router.delete('/deleteavoir/:id', avoirController.deleteAvoirController);

// Get all avoirs
router.get('/getallavoirs', avoirController.getAllAvoirsController);

module.exports = router;
