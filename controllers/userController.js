const { OAuth2Client } = require('google-auth-library');
const { generateAuthToken } = require('../config/jwt');
const User = require('../models/User');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}


class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res) {
    const { fullName, username, email, password } = req.body;
  
    try {
      const hashedPassword = await hashPassword(password);
      const user = await this.userService.createUser({
        fullName,
        username,
        email,
        password: hashedPassword,
      });
  
      const token = generateAuthToken(user);
      res.status(201).json({ msg: 'User registered', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error', msg: err.message });
    }
  }
  

  async googleLogin(req, res) {
    const { googleToken } = req.body;

    console.log(googleToken);
    
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      
      const payload = ticket.getPayload();
      const { sub: googleId, email, name } = payload;
  
      // Buscar el usuario por correo o Google ID
      let user = await User.findOne({ $or: [{ email }, { googleId }] });
  
      // Si no existe, crearlo
      if (!user) {
        const username = email.split('@')[0];
        user = await this.userService.createUser({
          fullName: name,
          username,
          email,
          googleId,
        });
      }
  
      // Generar un JWT
      const token = generateAuthToken(user);
      res.status(200).json({ token, msg: 'User authenticated with Google' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Google authentication failed', msg: err.message });
    }
  }
  async login(req, res) {
    const { credentials, password } = req.body; // Puede ser email o username

    try {
      // Buscar el usuario por email o username
      const user = await User.findOne({
        $or: [{ email: credentials }, { username: credentials }],
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Verificar la contraseña
      if (!user.password || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generar un token JWT
      const token = generateAuthToken(user);

      res.status(200).json({ msg: 'Login successful', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error', msg: err.message });
    }
  }

}

module.exports = UserController;
