const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const authController = require('../../../controllers/admin/authController');

router.post('/register', auth, authController.register);

router.post('/login', authController.login);

router.post('/forgetpassword', authController.forget);

router.post('/resetpassword', authController.passwordLinkSent);

router.post('/changepassword', auth, authController.changePassword);

module.exports = router;
