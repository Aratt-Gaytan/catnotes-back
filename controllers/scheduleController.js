const mongoose = require('mongoose');
const scheduleService = require('../services/scheduleService');

exports.createSchedule = async (req, res) => {
  try {
    const { day, subjects, userId } = req.body;

    const newSchedule = await scheduleService.createSchedule({ userId, day, subjects });
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Obtener todos los subjects de un usuario para un día específico
exports.getSubjectsByDay = async (req, res) => {
  try {
    const { userId, day } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const subjects = await scheduleService.getSubjectsByDay(userId, day);

    if (!subjects || !subjects.length) {
      return res.status(404).json({ message: 'No subjects found for this day' });
    }

    res.json({ day, subjects });
  } catch (err) {
    console.error('Error fetching subjects by day:', err);
    res.status(500).send('Server Error');
  }
};

exports.updateSubject = async (req, res) => {
  const { userId, day, subjectId, updatedSubject } = req.body;

  try {
    const updatedSchedule = await scheduleService.updateSubject(userId, day, subjectId, updatedSubject);
    res.json(updatedSchedule);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
