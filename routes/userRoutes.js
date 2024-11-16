// routes/userRoutes.js
const express = require('express');
const UserService = require('../services/userService');
const UserController = require('../controllers/userController');
const validateUserExists = require('../middleware/validateUser');
const router = express.Router();

const userController = new UserController(UserService);

router.post('/register', validateUserExists, (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.post('/auth/google', userController.googleLogin.bind(userController));


module.exports = router;
