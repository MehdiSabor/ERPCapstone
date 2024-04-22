// routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const accountController = require('../Controllers/accountController');

router.post('/register', accountController.register);
router.post('/login', accountController.login);
router.get('/getall', accountController.getAllUsers); // Get all users
router.put('/modify/:userId',  accountController.updateUser); // Update a user
router.delete('/delete/:userId',  accountController.deleteUser); // Delete a user
router.get('/get/:id', accountController.getUser);

module.exports = router;
