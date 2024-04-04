const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/clientController');

router.post('/createclient', clientController.createClient);
router.get('/getclient/:id', clientController.getClientById);
router.put('/updateclients/:id', clientController.updateClient);
router.delete('/deleteclient/:id', clientController.deleteClient);
router.get('/getallclients', clientController.getAllClients);

module.exports = router;
