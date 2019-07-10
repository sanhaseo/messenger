// Bypass token verificatoin for now...

const express = require('express');
const router = express.Router();

// User model
const User = require('../../models/User');

// UNFINISHED
// Verify token.
//
// @route   GET /api/users/:username
// @access  private
// If user exists, respond with { username }.
// Else respond with an error.
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Check if user is in db.
    const user = await User.findOne({ username });
    // If not, respond with an error.
    if (!user)
      return res.status(400).end();

    // If found, respond with an OK.
    // NOTE: In the future implementation,
    // we can respond with additional user info
    // such as profile pic.
    return res.json({ username });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;