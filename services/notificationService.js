const User = require('../models/User');
const firebaseAdmin = require('firebase-admin'); // Ejemplo con Firebase Cloud Messaging

class NotificationService {
  async sendNotification(userId, notificationType) {
    try {
      const user = await User.findById(userId);
      const deviceToken = user.deviceToken;

      const message = {
        to: deviceToken,
        notification: {
          title: 'Notificación de Horario',
          body: `Se ha ${notificationType === 'create' ? 'creado' : 'actualizado'} tu horario`,
        },
      };

      await firebaseAdmin.messaging().send(message);
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
      throw error;
    }
  }
}

module.exports = new NotificationService();