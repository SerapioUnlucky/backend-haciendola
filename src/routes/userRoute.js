const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const check = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/forgot-password/:username', userController.forgotPassword);
router.get('/profile/:id', check.auth, userController.profile);

module.exports = router;
