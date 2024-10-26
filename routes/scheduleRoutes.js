const express = require('express');
const { createSchedule, getSchedule } = require('../controllers/scheduleController');
const router = express.Router();

// Aquí suponemos que ya hay un middleware de autenticación
router.post('/schedule', createSchedule);
router.get('/schedule', getSchedule);

module.exports = router;
