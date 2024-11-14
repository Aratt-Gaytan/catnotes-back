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