const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {generateAuthToken} = require("../config/jwt")

exports.register = async (req, res) => {
  const { fullName, username, email, password } = req.body;
  console.log(req.body); // (Optional for debugging)

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    let searchUsername = await User.findOne({ username });
    if (searchUsername)
      return res.status(400).json({ msg: "Username already taken" });

    user = new User({ fullName, username, email });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    
    const token = generateAuthToken(user); // (Defined below)

    await user.save();
    res.status(201).json({ msg: "User registered", token: token });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { credentials, password } = req.body;

  try {
    let user = await User.findOne({  $or: [{ email: credentials }, { username: credentials } ] });
    if (!user)
      return res.status(403).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
    if (!isMatch)
      return res.status(403).json({ msg: "Invalid email or password" });

    const token = generateAuthToken(user); // Generate JWT from user object
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
