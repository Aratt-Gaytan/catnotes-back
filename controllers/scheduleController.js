const scheduleService = require('../services/scheduleService');

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


exports.addSubject = async (req, res) => {
  try {
    const { scheduleId, subject } = req.body;

    const newSubject = await scheduleService.addSubject(scheduleId, subject);
    res.status(201).json({ message: 'Subject added successfully', subject: newSubject });
  } catch (error) {
    console.error('Error adding subject:', error);
    res.status(500).send('Server Error');
  }
};


exports.updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params; // ID del subject a actualizar
    const updatedSubject = req.body; // Nuevos datos del subject

    if (!subjectId) {
      return res.status(400).json({ message: 'Subject ID is required' });
    }

    const subject = await scheduleService.updateSubject(subjectId, updatedSubject);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject updated successfully', subject });
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).send('Server Error');
  }
};


exports.deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    if (!subjectId) {
      return res.status(400).json({ message: 'Subject ID is required' });
    }

    const result = await scheduleService.deleteSubject(subjectId);

    if (!result) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).send('Server Error');
  }
};



exports.getSubjectsByDay = async (req, res) => {
  try {
    const { day } = req.query;

    const subjects = await scheduleService.getSubjectsByDay(day);

    if (!subjects.length) {
      return res.status(404).json({ message: 'No subjects found for this day' });
    }

    res.json({ day, subjects });
  } catch (err) {
    console.error('Error fetching subjects by day:', err);
    res.status(500).send('Server Error');
  }
};
