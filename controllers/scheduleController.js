const Schedule = require('../models/Schedule');

exports.createSchedule = async (req, res) => {
    const { day, subjects, user } = req.body;

    try {
        const newSchedule = new Schedule({
            userId: user.id, 
            day,
            subjects
        });

        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.getSchedule = async (req, res) => {
    const { user } = req.query.user;

    try {
        const schedule = await Schedule.find({ userId: user });
        res.json(schedule);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};


exports.updateSubject = async (req, res) => {
    const { day, subjectId, updatedSubject, user } = req.body;

    try {
        const schedule = await Schedule.findOne({ userId: user.id, day });
        
        if (!schedule) {
            return res.status(404).json({ msg: 'Schedule not found' });
        }

        const subjectIndex = schedule.subjects.findIndex(subject => subject.subjectId === subjectId);
        
        if (subjectIndex === -1) {
            return res.status(404).json({ msg: 'Subject not found' });
        }

        // Actualiza el subject específico
        schedule.subjects[subjectIndex] = { ...schedule.subjects[subjectIndex], ...updatedSubject };

        await schedule.save();
        res.json(schedule);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};