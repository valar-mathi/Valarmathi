const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', userController.getUserProfile);

module.exports = router;
