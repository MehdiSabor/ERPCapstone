const express = require('express');
const router = express.Router();
const blController = require('../Controllers/blController');

router.post('/createbl', blController.createBonLiv);
router.get('/getbl/:id', blController.getBonLivById);
router.put('/updatebl/:id', blController.updateBonLiv);
router.delete('/deletebl/:id', blController.deleteBonLiv);
router.get('/getallbl', blController.getAllBonLivs);
router.post('/validatebl/:id', blController.validateBonLiv);
router.get('/getallitem/:refBL', detailBonlivController.getAllDetailBonlivsByBonliv);
router.get('/getitem/:refBL/:codeArt', detailBonlivController.getDetailBonlivById);
router.put('/modifyitem/:refBL/detail/:codeArt', detailBonlivController.updateDetailBonliv);
router.delete('/deleteitem/:refBL/:codeArt', detailBonlivController.deleteDetailBonliv);



module.exports = router;
