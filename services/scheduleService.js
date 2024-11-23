const Schedule = require('../models/Schedule');
const Subject = require('../models/Subject')

class ScheduleService {
  async createSchedule(data) {
    const newSchedule = new Schedule(data);
    await newSchedule.save();
    return newSchedule;
  }

  /**
   * Obtener los subjects asociados a un día y usuario
   * @param {string} userId - ID del usuario autenticado
   * @param {string} day - Día de la semana
   * @returns {Promise<Array>} - Lista de subjects
   */
  async getSubjectsByDay(userId, day) {
    // Encontrar el horario correspondiente al día
    const schedule = await Schedule.findOne({ day });

    if (!schedule) {
      return []; // Si no existe un horario para ese día, retornar vacío
    }

    // Buscar los subjects asociados al horario y usuario
    const subjects = await Subject.find({
      scheduleId: schedule._id,
      userId: userId,
    });

    return subjects;
  }

  /**
   * Obtener todos los horarios
   * @returns {Promise<Array>} - Lista de horarios
   */
  async getAllSchedules() {
    const schedules = await Schedule.find(); // Obtiene todos los registros
    return schedules;
  }
}

module.exports = new ScheduleService();
