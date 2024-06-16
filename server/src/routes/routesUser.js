const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Get all users
router.get('/getAllUsers', userController.getAllUsers);

// Get single user
router.get('/getUserById:id', userController.getUserById);

// Add user
router.post('/addUser', userController.addUser);

// Update user
router.put('/updateUser/:id', userController.updateUser);

// Delete user
router.delete('/deleteUser/:id', userController.deleteUser);

router.get('/getUser/:email', userController.getUserByEmail);


module.exports = router;
