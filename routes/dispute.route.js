
const express = require('express');
const { signup,
	signupUser,
	login,
	getUser
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signup/user', signupUser);
router.post('/login', login);

router.get('/user/:id', getUser);