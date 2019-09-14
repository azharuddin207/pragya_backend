const express = require('express');
const router = express.Router()

const UserController = require('./../../controllers/user/userController');

router.get('/category', UserController.get);
router.post('/register', UserController.userRegistration);

module.exports = router;
