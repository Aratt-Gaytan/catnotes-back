const express = require('express');
const validateToken = require('../middleware/validateToken');
const scheduleController = require('../controllers/scheduleController');
const ScheduleService = require('../services/scheduleService');

const router = express.Router();

// Crear un nuevo horario
router.post('/schedule', validateToken, scheduleController.createSchedule);

// Obtener todos los horarios de un usuario
router.get('/schedule', validateToken, async (req, res) => {
  try {
    
    
    const schedule = await ScheduleService.getSchedule();
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).send('Server Error');
  }
});

// Obtener todos los registros de Schedule
router.get('/schedules', validateToken, scheduleController.getAllSchedules);

// Añadir un nuevo subject
router.post('/schedule/subject', validateToken, scheduleController.addSubject);

// Actualizar un subject
router.put('/schedule/subject', validateToken, scheduleController.updateSubject);

// Eliminar un subject
router.delete('/schedule/subject/:subjectId', validateToken, scheduleController.deleteSubject);

// Obtener todos los subjects de un usuario
router.get('/schedule/subjects', validateToken, scheduleController.getAllSubjects);

// Obtener los subjects de un día específico
router.get('/schedule/subjectsByDay', validateToken, scheduleController.getSubjectsByDay);


module.exports = router;
