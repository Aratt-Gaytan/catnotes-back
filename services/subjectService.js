const Subject = require('../models/Subject');
const Schedule = require('../models/Schedule');

class SubjectService {
  async addSubject(scheduleId, subjectData) {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) throw new Error('Schedule not found');

    const newSubject = new Subject({
      ...subjectData,
      scheduleId,
      userId: schedule.userId
    });

    await newSubject.save();
    return newSubject;
  }

  async updateSubject(subjectId, updatedSubject) {
    const subject = await Subject.findById(subjectId);
    if (!subject) throw new Error('Subject not found');

    Object.assign(subject, updatedSubject);
    await subject.save();

    return subject;
  }


  async deleteSubject(subjectId) {
    const deletedSubject = await Subject.findByIdAndDelete(subjectId);
    return deletedSubject; // Devuelve el subject eliminado o null si no se encontró
  }


}

module.exports = new SubjectService();
