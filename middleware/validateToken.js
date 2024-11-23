const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Si necesitas verificar el usuario en la base de datos

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    // Asignar el usuario decodificado al objeto req
    req.user = { id: decoded.id }; // Asegúrate de que el token contenga `id`

    // Opcional: Verificar si el usuario existe en la base de datos
    const userExists = await User.findById(req.user.id);
    if (!userExists) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    next();
  } catch (err) {
    console.error('Token is not valid:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
