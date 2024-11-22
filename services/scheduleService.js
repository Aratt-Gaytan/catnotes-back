const Schedule = require('../models/Schedule');

class ScheduleService {
  async createSchedule(data) {
    const newSchedule = new Schedule(data);
    await newSchedule.save();
    return newSchedule;
  }

  async getSubjectsByDay(day) {
    const schedule = await Schedule.findOne({ day });
    if (!schedule) return [];

    return await Subject.find({ scheduleId: schedule._id });
  }
}

module.exports = new ScheduleService();
