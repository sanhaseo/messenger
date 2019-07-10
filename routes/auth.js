// Bypass authentication for now...

const express = require('express');
const router = express.Router();

// User model
const User = require('../models/User');

// UNFINISHED
// @route   POST /auth/register
// @access  public
router.post('/register', async (req, res) => {
  try {

    // Server side input validation goes here...

    const { username } = req.body;

    // Check if user already exists in db.
    const userExists = await User.findOne({ username });
    // If so, respond with an error.
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    // Salt and hash password here...

    // Create and save the new user.
    const user = new User({ username });
    await user.save();

    // Sign json web token here...

    // Response body includes the username
    res.json({ name: username });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// UNFINISHED
// @route   POST /auth/login
// @access  public
router.post('/login', async (req, res) => {
  try {

    // Server side input validation goes here...

    const { username } = req.body;

    // Check if user is in the db.
    const user = await User.findOne({ username });
    // If not, respond with error.
    if (!user)
      return res.status(400).json({ message: 'User does not exist' });

    // Password validation goes here...

    // Sign json web token here...

    // Response body includes the username
    res.json({ name: username });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;