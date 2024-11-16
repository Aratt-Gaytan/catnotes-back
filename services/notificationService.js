require('dotenv').config();

const User = require('../models/User');
const firebaseAdmin = require('firebase-admin'); // Ejemplo con Firebase Cloud Messaging


// Inicializar Firebase usando las variables de entorno
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}


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