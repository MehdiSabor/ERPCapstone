// routes/DevisRoutes.js
const express = require('express');
const router = express.Router();
const devisController = require('../Controllers/devisController');

// Create a new devis (quote)
router.post('/createdevis', devisController.createDevisController);

// Validate a devis and create a bonliv (delivery note)
router.post('/validate/:refDevis', devisController.validateDevisController);

// Get a single devis by its ID
router.get('/devis/:id', devisController.getDevisByIdController);

// Update a devis by its ID
router.put('/updatedevis/:id', devisController.updateDevisController);

// Delete a devis by its ID
router.delete('/deletedevis/:id', devisController.deleteDevisController);

// Get all devis
router.get('/getalldevis', devisController.getAllDevisController);

// Get devis by client ID
router.get('/getdevis/client/:clientId', devisController.getDevisByClientController);

// Get devis by commercial ID
router.get('/getdevis/commercial/:commercialId', devisController.getDevisByCommercialController);

// Add an item to a devis
router.post('/additem/:refDevis', devisController.addItemToDevisController);

// Delete an item from a devis
router.delete('/deleteitem/:refDevis/:codeArt', devisController.deleteItemFromDevisController);

// Update an item in a devis
router.put('/modifyitem/:refDevis/:codeArt', devisController.updateItemInDevisController);

// Get all items in a devis
router.get('/getallitems/:refDevis', devisController.getItemsInDevisController);

module.exports = router;
