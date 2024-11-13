const Schedule = require("../models/Schedule");
const mongoose = require("mongoose");

exports.createSchedule = async (req, res) => {
  try {
    const { day, subjects, userId } = req.body;

    const newSchedule = new Schedule({
      userId: userId, // Assuming `user.id` is the actual user ID
      day,
      subjects,
    });

    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error"); // More specific error message
  }
};

exports.getSchedule = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.query.user);

    const schedule = await Schedule.find({ userId: userId });
    console.log(schedule);
    
    if (!schedule.length) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json({ id: userId, schedule });
  } catch (err) {
    console.error("Error fetching schedule:", err);
    res.status(500).send("Server Error"); // More specific error message
  }
};

exports.updateSubject = async (req, res) => {
  const { day, subjectId, updatedSubject, user } = req.body;

  try {
    const schedule = await Schedule.findOne({ userId: user.id, day });

    if (!schedule) {
      return res.status(404).json({ msg: "Schedule not found" });
    }

    const subjectIndex = schedule.subjects.findIndex(
      (subject) => subject.subjectId === subjectId
    );

    if (subjectIndex === -1) {
      return res.status(404).json({ msg: "Subject not found" });
    }

    // Actualiza el subject específico
    schedule.subjects[subjectIndex] = {
      ...schedule.subjects[subjectIndex],
      ...updatedSubject,
    };

    await schedule.save();
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
