const express = require('express');
const { deposit } = require('../controllers/depositController.js');
const authenticate = require('../middlewares/Authenticate.js');

const router = express.Router();

router.post('/deposit', authenticate, deposit);
router.get('/deposit/:id', authenticate, deposit);

module.exports = router;