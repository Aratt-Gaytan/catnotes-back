const express = require('express');
const router = express.Router();
const { createSchedule, getSchedule, updateSubject } = require('../controllers/scheduleController');

// Rutas existentes
router.post('/schedule', createSchedule);
router.get('/schedule', getSchedule);

// Nueva ruta para actualizar un subject
router.put('/schedule/subject', updateSubject);

module.exports = router;
