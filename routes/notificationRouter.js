// routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');

router.post('/schedule/notify', validateToken, async (req, res) => {
  const { userId, notificationType } = req.body;

  try {
    await NotificationService.sendNotification(userId, notificationType);
    res.status(200).json({ message: 'Notificación enviada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar la notificación' });
  }
});

router.post('/send-notification', async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    to: token,
    notification: {
      title: title,
      body: body,
    },
  };

  try {
    await admin.messaging().send(message);
    res.json({ message: 'Notificación enviada' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error');
  }
});


module.exports = router;
