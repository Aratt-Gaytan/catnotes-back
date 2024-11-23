

const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Schedule = require('../models/Schedule');

class SubjectService {

  async getSubjectsByUser(userId) {
    // Obtener todos los subjects del usuario y hacer un populate de scheduleId
    const subjects = await Subject.find({ userId }).populate('scheduleId');
  
    // Agrupar los subjects por scheduleId
    const groupedBySchedule = subjects.reduce((result, subject) => {
      const schedule = subject.scheduleId;
  
      // Si aún no existe el schedule en el resultado, agregarlo
      if (!result[schedule._id]) {
        result[schedule._id] = {
          scheduleId: schedule._id,
          day: schedule.day,
          subjects: [],
        };
      }
  
      // Agregar el subject al array correspondiente
      result[schedule._id].subjects.push(subject);
      return result;
    }, {});
  
    // Convertir el objeto resultante a un array para que sea más fácil de manejar
    return Object.values(groupedBySchedule);
  }
  
  
    // Obtener subjects de un día específico
    async getSubjectsByDay(userId, day) {
      // Buscar schedules que coincidan con el día
      const schedules = await Schedule.find({ day });
      if (!schedules.length) return [];
      
      // Obtener todos los subjects relacionados con esos schedules
      const subjects = await Subject.find({
        scheduleId: { $in: schedules.map(s => s._id) },
        userId
      }).populate('scheduleId');
  
      return subjects;
    }


  async addSubject(userId, scheduleId, subjectData) {


    console.log(subjectData);
    
    // Crear el nuevo subject
    const newSubject = new Subject({
      ...subjectData.subject,
      userId
    });

    await newSubject.save();
    return newSubject;
  }

  async updateSubject(userId, subjectId, updatedSubject) {


    // Buscar el subject por ID y usuario
    const subject = await Subject.findOne({ subjectId, userId });
    if (!subject) {
      throw new Error('Subject not found or unauthorized');
    }

    // Actualizar el subject
    Object.assign(subject, updatedSubject);
    await subject.save();
    return subject;
  }

  async deleteSubject(userId, subjectId) {
    // Convertir `subjectId` a `ObjectId` si es un string
    let validSubjectId;
    try {
      validSubjectId = new mongoose.Types.ObjectId(subjectId);
    } catch (error) {
      throw new Error('Invalid subjectId format');
    }

    // Eliminar el subject
    const deletedSubject = await Subject.findOneAndDelete({ _id: validSubjectId, userId });
    return deletedSubject;
  }
}

module.exports = new SubjectService();
