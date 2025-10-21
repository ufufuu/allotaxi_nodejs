const express = require('express');

const authRoutes = require('./authRoutes');
const depositRoutes = require('./depositRoutes');
const releaseRoutes = require('./releaseRoutes');
const transferRoutes = require('./transferRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/deposit',  depositRoutes);

router.use('/release', releaseRoutes);
router.use('/transfer', transferRoutes);

module.exports = router;