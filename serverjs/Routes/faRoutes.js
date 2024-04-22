const express = require('express');
const router = express.Router();
const factureController = require('../Controllers/faController');

router.get('/getfacture/:id', factureController.getFactureById);
router.get('/getallfactures', factureController.getAllFactures);
router.post('/validatefacture/:id', factureController.validateFacture);
router.get('/getallitems/:id', factureController.getAllDetailFacturesByFacture);
router.post('/cancelFacture/:id', factureController.cancelFacture);


module.exports = router;
