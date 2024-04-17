const express = require('express');
const router = express.Router();
const avoirController = require('../controllers/avController');

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
router.get('/getallavoir', avoirController.getAllAvoirsController);

// Get all avoirs for a specific client
router.get('/getavoir/client/:clientId', avoirController.getAvoirsByClientController);

// Add an item to an avoir
router.post('/additem/:refAvoir', avoirController.addItemToAvoirController);

// Delete an item from an avoir
router.delete('/deleteitem/:refAvoir/:codeArt', avoirController.deleteItemFromAvoirController);

// Update an item in an avoir
router.put('/modifyitem/:refAvoir/:codeArt', avoirController.updateItemInAvoirController);

// Get all items in an avoir
router.get('/getallitems/:refAvoir', avoirController.getItemsInAvoirController);

module.exports = router;
