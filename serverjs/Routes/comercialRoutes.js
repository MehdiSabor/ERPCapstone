// routes/comercialRoutes.js
const express = require('express');
const router = express.Router();
const comercialController = require('../controllers/comercialController');

router.post('/createcom', comercialController.createComercial);
router.get('/getcom/:id', comercialController.getComercialById);
router.put('/updatecom/:id', comercialController.updateComercial);
router.delete('/deletecom/:id', comercialController.deleteComercial);
router.get('/getallcoms', comercialController.getAllComerciaux);

module.exports = router;
