const express = require('express');
const router = express.Router();
const blController = require('../Controllers/blController');

router.post('/createbl', blController.createBonLiv);
router.get('/getbl/:id', blController.getBonLivById);
router.put('/updatebl/:id', blController.updateBonLiv);
router.delete('/deletebl/:id', blController.deleteBonLiv);
router.get('/getallbl', blController.getAllBonLivs);
router.post('/validatebl/:id', blController.validateBonLiv);
router.get('/getallitems/:refBL', blController.getAllDetailBonlivsByBonliv);
router.get('/getitem/:refBL/:codeArt', blController.getDetailBonlivById);
router.put('/updateitem/:refBL/:codeArt', blController.updateDetailBonliv);
router.delete('/deleteitem/:refBL/:codeArt', blController.deleteDetailBonliv);
router.post('/bulkupdateitems', blController.bulkUpdateDetailBonliv);


module.exports = router;
