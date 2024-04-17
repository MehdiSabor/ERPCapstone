const express = require('express');
const router = express.Router();
const regController = require('../controllers/regController');

router.post('/create', regController.createReglementController);
router.get('/:id', regController.getReglementByIdController);
router.put('/update/:id', regController.updateReglementController);
router.delete('/delete/:id', regController.deleteReglementController);
router.get('/all', regController.getAllReglementsController);
router.post('/createBatchDetails', regController.createReglementDetailsBatchController);

module.exports = router;
