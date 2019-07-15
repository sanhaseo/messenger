const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');

// User model
const User = require('../../models/User');

// @route   GET /api/users/:username
// @access  private
// If user exists, respond with { username }.
// Else respond with an error.
router.get('/:username', verifyToken, async (req, res) => {
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
    res.status(500).end();
  }
});

module.exports = router;