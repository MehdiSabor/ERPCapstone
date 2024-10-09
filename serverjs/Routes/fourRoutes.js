// routes/fourRoutes.js
const express = require('express');
const router = express.Router();
const fournisseurController = require('../Controllers/fourController');

router.post('/createfour', fournisseurController.createFournisseur);
router.get('/getfour/:id', fournisseurController.getFournisseurById);
router.put('/updatefour/:id', fournisseurController.updateFournisseur);
router.delete('/deletefour/:id', fournisseurController.deleteFournisseur);
router.get('/getallfour', fournisseurController.getAllFournisseurs);

module.exports = router;
