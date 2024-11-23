// routes/index.js
const express = require('express');
const userRoutes = require('./userRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const notificationRoutes = require('./notificationRouter');

const router = express.Router();

// Agregar rutas con prefijos
router.use('/', userRoutes);
router.use('/', scheduleRoutes);
router.use('/', notificationRoutes);

module.exports = router;
