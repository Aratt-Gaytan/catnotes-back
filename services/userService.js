const User = require('../models/User');
const bcrypt = require('bcryptjs');
const scheduleService = require('./scheduleService'); // Importamos el ScheduleService

class UserService {
  async createUser({ fullName, username, email, password, googleId }) {
    const user = new User({ fullName, username, email, googleId });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();


    return user;
  }

  async validateUser(credentials, password) {
    const user = await User.findOne({ $or: [{ email: credentials }, { username: credentials }] });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    return user;
  }
}

module.exports = new UserService();
