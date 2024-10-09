// routes/familleRoutes.js
const express = require('express');
const router = express.Router();
const familleController = require('../controllers/familleController');

router.post('/create', familleController.createFamilleController);
router.get('/get/:id', familleController.getFamilleByIdController);
router.get('/getall', familleController.getAllFamillesController);
router.put('/modify/:id', familleController.updateFamilleController);
router.delete('/delete/:id', familleController.deleteFamilleController);

module.exports = router;
