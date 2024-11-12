// routes/scheduleRoutes.js
const express = require('express');
const validateToken = require('../middleware/validateToken');
const ScheduleService = require('../services/scheduleService');
const router = express.Router();

router.post('/schedule', validateToken, async (req, res) => {
  const { day, subjects } = req.body;
  const schedule = await ScheduleService.createSchedule({ day, subjects, userId: req.user.id });
  res.status(201).json(schedule);
});

router.get('/schedule', validateToken, async (req, res) => {
  const schedule = await ScheduleService.getSchedule(req.user.id);
  res.json(schedule);
});

router.put('/schedule/subject', validateToken, async (req, res) => {
  const { day, subjectId, updatedSubject } = req.body;
  const updatedSchedule = await ScheduleService.updateSubject(req.user.id, day, subjectId, updatedSubject);
  res.json(updatedSchedule);
});

module.exports = router;
