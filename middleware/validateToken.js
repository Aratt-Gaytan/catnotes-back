// middleware/validateToken.js
const { verifyToken } = require('../config/jwt');

const validateToken = async (req, res, next) => {
  const token = req.header('authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = await verifyToken(token);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = validateToken;
