// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const notificationRoutes = require('./notificationRouter');

const router = express.Router();

// Agregar rutas con prefijos
router.use('/user', userRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/notification', notificationRoutes);

module.exports = router;
