const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User model
const User = require('../models/User');

// In dev, use .env file for config vars.
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

// @route   POST /auth/register
// @access  public
// Create new user and respond with signed token.
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists in db.
    const userExists = await User.findOne({ username });
    // If so, respond with an error.
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    // Salt and hash the password.
    const passwordHash = await bcrypt.hash(password, 10);

    // Create and save the new user.
    const user = new User({ username, password: passwordHash });
    await user.save();

    // Sign token with username as payload.
    const token = jwt.sign(
      { username },
      process.env.TOKEN_SECRET
    );

    // Respond with token in cookie.
    res.cookie('authToken', token, {
      httpOnly: true
    }).json({ username });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /auth/login
// @access  public
// Authenticate user and respond with signed token.
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user is in the db.
    const user = await User.findOne({ username });
    // If not, respond with an error.
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    // Verify password.
    const validPassword = await bcrypt.compare(password, user.password);
    // If not valid, respond with an error.
    if (!validPassword) 
      return res.status(400).json({ message: 'Incorrect password' });

    // Sign token with username as payload.
    const token = jwt.sign(
      { username },
      process.env.TOKEN_SECRET
    );

    // Respond with token in cookie.
    res.cookie('authToken', token, {
      httpOnly: true
    }).json({ username });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });    
  }
});

// @route   GET auth/logout
// @access  Public
// Clear cookie to logout.
router.get('/logout', (req, res) => {
  const token = req.cookies.authToken;
  res.clearCookie('authToken', token, {
    httpOnly: true
  }).end();
});

// @route   GET /auth/verify
// @access  public
// Verify that incoming request from client contains cookie with valid JWT.
router.get('/verify', async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.json({ isAuthenticated: false });

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const { username } = payload;

    const user = await User.findOne({ username });

    res.json({ 
      isAuthenticated: true,
      username: user.username
    });
  } catch (err) {
    res.json({ isAuthenticated: false });
  }
});

module.exports = router;