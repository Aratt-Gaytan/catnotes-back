// controllers/userController.js
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { generateAuthToken } = require('../config/jwt');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      res.status(500).json({error: 'Server error', msg: err});
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
      res.status(500).json({error: 'Server error', msg: err});

    }
  }


    async googleLogin(req, res) {
    const { googleToken } = req.body;
    try {
      // Verificar el token de Google
      const ticket = await googleClient.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const { sub: googleId, email, name } = payload;

      // Buscar si el usuario ya existe en tu base de datos
      let user = await User.findOne({ $or: [{ email }, { googleId }] });

      if (!user) {
        // Si no existe, crear un nuevo usuario
        const username = email.split('@')[0]; // Generar un username básico
        user = new User({
          fullName: name,
          username,
          email,
          googleId,
        });
        await user.save();
      }

      // Generar un token JWT personalizado
      const token = generateAuthToken(user);
      res.status(200).json({ token, msg: 'User authenticated with Google' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Google authentication failed', msg: err.message });
    }
  }

  
}




module.exports = UserController;
