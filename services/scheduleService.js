// services/scheduleService.js
const Schedule = require('../models/Schedule');
//const NotificationService = require('../services/notificationService')
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 });

class ScheduleService {
  async createSchedule(data) {
    const newSchedule = new Schedule(data);
    await newSchedule.save();
    return newSchedule;
  }

  async getSchedule(userId) {
    const cacheKey = `schedule_${userId}`;
    let schedule = cache.get(cacheKey);
    
    let scheduleFromMongo = await Schedule.find({ userId });
    if (schedule != scheduleFromMongo){
      
      schedule = scheduleFromMongo
    }
    cache.set(cacheKey, schedule);

    //await NotificationService.sendNotification(userId, 'create');

    return schedule;
  }

  async updateSubject(userId, day, subjectId, updatedSubject) {
    const schedule = await Schedule.findOne({ userId, day });
    if (!schedule) throw new Error('Schedule not found');

    const subjectIndex = schedule.subjects.findIndex((subject) => subject.subjectId === subjectId);
    if (subjectIndex === -1) throw new Error('Subject not found');

    schedule.subjects[subjectIndex] = {
      ...schedule.subjects[subjectIndex],
      ...updatedSubject,
    };
    await schedule.save();

    //await NotificationService.sendNotification(userId, 'update');
    return schedule;
  }
}

module.exports = new Proxy(new ScheduleService(), {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return async (...args) => {
        console.log(`Calling ${prop} with args:`, args);
        return await target[prop](...args);
      };
    }
    return target[prop];
  },
});
