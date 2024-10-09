// routes/regRoutes.js

const express = require('express');
const router = express.Router();
const regController = require('../controllers/regController');

router.post('/create', regController.createReglementController);
router.get('/get/:id', regController.getReglementByIdController);
router.put('/update/:id', regController.updateReglementController);
router.delete('/delete/:id', regController.deleteReglementController);
router.get('/all', regController.getAllReglementsController);
router.post('/createBatchDetails', regController.createReglementDetailsBatchController);
router.get('/getAllUnified/:code_clt', regController.getAllUnifiedFactureAvoirController);
router.post('/addDetail', regController.addDetailReglementController);
router.delete('/deletedetail/:refRegV/:refAvFac', regController.deleteReglementDetail);

module.exports = router;
