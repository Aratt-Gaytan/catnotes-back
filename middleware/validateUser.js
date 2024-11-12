// middleware/validateUser.js
const User = require('../models/User');

const validateUserExists = async (req, res, next) => {
  const { email, username } = req.body;
  
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: 'User already exists' });

  let searchUsername = await User.findOne({ username });
  if (searchUsername) return res.status(400).json({ msg: 'Username already taken' });

  next();
};

module.exports = validateUserExists;
