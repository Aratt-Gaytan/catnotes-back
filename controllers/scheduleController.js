const scheduleService = require('../services/scheduleService');
const subjectService = require('../services/subjectService');
const Schedule = require('../models/Schedule')

const SubjectService = require('../services/subjectService');


exports.addSubject = async (req, res) => {
  try {
    const userId = req.user.id; // Obtenido del middleware
    const { scheduleId, ...subjectData } = req.body;

    // Llamar al servicio para agregar el subject
    const newSubject = await subjectService.addSubject(userId, scheduleId, subjectData);

    res.status(201).json({ message: 'Subject added successfully', subject: newSubject });
  } catch (error) {
    console.error('Error adding subject:', error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const updatedSubject = req.body;

    const subject = await subjectService.updateSubject(req.user.id, subjectId, updatedSubject);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject updated successfully', subject });
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const result = await subjectService.deleteSubject(req.user.id, subjectId);

    if (!result) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};



exports.createSchedule = async (req, res) => {
  try {
    const { day } = req.body;

    const newSchedule = await scheduleService.createSchedule({ day });
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};




exports.getAllSubjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const subjects = await subjectService.getSubjectsByUser(userId);
    if (!subjects.length) {
      return res.status(404).json({ message: 'No subjects found' });
    }

    res.json({ subjects });
  } catch (error) {
    console.error('Error fetching all subjects:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getSubjectsByDay = async (req, res) => {
  const { day } = req.query; // Asegúrate de recibir `day` desde los query params
  const userId = req.user.id; // Valida que `req.user` esté configurado

  if (!day) {
    return res.status(400).json({ message: 'Day is required' });
  }

  try {
    const subjects = await SubjectService.getSubjectsByDay(userId, day);
    res.json({ subjects });
    

  } catch (error) {
    console.error('Error fetching subjects by day:', error);
    res.status(500).send('Server Error');
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await scheduleService.getAllSchedules();

    if (!schedules.length) {
      return res.status(404).json({ message: 'No schedules found' });
    }

    res.status(200).json({ schedules });
  } catch (error) {
    console.error('Error fetching all schedules:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
