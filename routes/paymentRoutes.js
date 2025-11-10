const express = require('express');
const { deposit } = require('../controllers/paymentController.js');
const authenticate = require('../middlewares/Authenticate.js');

const router = express.Router();

router.post('/deposit', authenticate, deposit);
router.get('/create-pay-intent', authenticate, deposit);

router.get('/user/:userId', authenticate, deposit);
router.get('/list/:userId', listPayments);


module.exports = router;