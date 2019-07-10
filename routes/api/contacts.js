// Bypass token verificatoin for now...

const express = require('express');
const router = express.Router();

// User model
const User = require('../../models/User');

// UNFINISHED
// When JWT is implemented,
// use user id in JWT instead of currentUser.
// Change method back to get '/'.
// Verify token.
//
// @route   GET /api/contacts
// @access  private
// Get current user's contacts.
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    // Find user.
    const user = await User.findOne({ username });
    
    // If user not found, respond with an error.
    if (!user) return res.status(400).end();
    // Else respond with contacts.
    res.json(user.contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// UNFINISHED
// When JWT is implemented,
// use user id in JWT instead of currentUser.
// Verify token.
//
// @route   POST /api/contacts
// @access  private
// Add given user to current user's contacts.
router.post('/', async (req, res) => {
  try {
    const { name, currentUser } = req.body;
    // Add given username to current user's contacts.
    const query = await User.updateOne(
      { username: currentUser }, 
      { $addToSet: { contacts: name } }
    );

    // If user not found, respond with an error.
    if (!query.n) return res.status(400).end();
    // Else respond with an OK.
    res.end();

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;