const express = require('express');
const validateToken = require('../middleware/validateToken');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

// Crear un nuevo horario
router.post('/schedule', validateToken, scheduleController.createSchedule);

// Obtener todos los horarios de un usuario
router.get('/schedule', validateToken, async (req, res) => {
  try {
    const schedule = await ScheduleService.getSchedule(req.user.id);
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).send('Server Error');
  }
});

// Obtener subjects por día
router.get('/schedule/subjectsByDay', validateToken, scheduleController.getSubjectsByDay);

// Añadir un nuevo subject
router.post('/schedule/subject', validateToken, scheduleController.addSubject);

// Actualizar un subject
router.put('/schedule/subject/:subjectId', validateToken, scheduleController.updateSubject);

// Eliminar un subject
router.delete('/schedule/subject/:subjectId', validateToken, scheduleController.deleteSubject);

module.exports = router;
