const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { fullName, username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ fullName, username, email });

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(201).json({ msg: 'User registered' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Aquí puedes agregar la lógica para Google OAuth2
