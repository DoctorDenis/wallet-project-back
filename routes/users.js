const express = require('express');
const validateUser = require('../helpers/userJoiValidation');
const validateToken = require('../helpers/validateToken');
const { register, login, logout } = require('../controllers/users/index');

const router = express.Router();

router.post('/register', validateUser, register);
router.post('/login', validateUser, login);
router.post('/logout', validateToken, logout);

module.exports = router;
