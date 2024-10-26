const Schedule = require('../models/Schedule');

exports.createSchedule = async (req, res) => {
    const { day, subjects } = req.body;

    try {
        const newSchedule = new Schedule({
            userId: req.user.id, 
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
    try {
        const schedule = await Schedule.find({ userId: req.user.id });
        res.json(schedule);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
