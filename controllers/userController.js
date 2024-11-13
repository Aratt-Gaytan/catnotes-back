// controllers/userController.js
const bcrypt = require('bcryptjs');
const { generateAuthToken } = require('../config/jwt');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res) {
    const { fullName, username, email, password } = req.body;
    try {
      let user = await this.userService.createUser({ fullName, username, email, password });
      const token = generateAuthToken(user);
      res.status(201).json({ msg: 'User registered', token });
    } catch (err) {
      console.error(err);
      res.status(500).json(error: 'Server error', msg: err);
    }
  }

  async login(req, res) {
    const { credentials, password } = req.body;
    try {
      const user = await this.userService.validateUser(credentials, password);
      const token = generateAuthToken(user);
      res.send({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json(error: 'Server error', msg: err);

    }
  }
}

module.exports = UserController;
