const express = require('express');
const validateToken = require('../middleware/validateToken');
const ScheduleService = require('../services/scheduleService');
const router = express.Router();

// Ruta para crear un nuevo horario
router.post('/schedule', validateToken, async (req, res) => {
  try {
    const { day, subjects } = req.body;
    const schedule = await ScheduleService.createSchedule({ day, subjects, userId: req.user.id });
    res.status(201).json(schedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).send('Server Error');
  }
});

// Ruta para obtener el horario completo de un usuario
router.get('/schedule', validateToken, async (req, res) => {
  try {
    const schedule = await ScheduleService.getSchedule(req.user.id);
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).send('Server Error');
  }
});

// Ruta para obtener los subjects de un día específico
router.get('/schedule/subjectsByDay', validateToken, async (req, res) => {
  try {
    const { day } = req.query; // Asegúrate de que `day` se pase como parámetro de consulta
    if (!day) {
      return res.status(400).json({ message: 'Day is required' });
    }
    
    const subjects = await ScheduleService.getSubjectsByDay(req.user.id, day);
    res.json({ day, subjects });
  } catch (error) {
    console.error('Error fetching subjects by day:', error);
    if (error.message === 'No subjects found for this day') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).send('Server Error');
  }
});

// Ruta para actualizar un subject específico dentro de un horario
router.put('/schedule/subject', validateToken, async (req, res) => {
  try {
    const { day, subjectId, updatedSubject } = req.body;
    const updatedSchedule = await ScheduleService.updateSubject(req.user.id, day, subjectId, updatedSubject);
    res.json(updatedSchedule);
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
