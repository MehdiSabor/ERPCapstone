// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/createclient', clientController.createClient);
router.get('/getclient/:id', clientController.getClientById);
router.put('/updateclients/:id', clientController.updateClient);
router.delete('/deleteclient/:id', clientController.deleteClient);
router.get('/getallclients', clientController.getAllClients);
router.post('/bulk-upload', upload.single('file'), clientController.bulkUploadClients);

module.exports = router;

