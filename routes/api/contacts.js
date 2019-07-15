const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');

// User model
const User = require('../../models/User');

// @route   GET /api/contacts
// @access  private
// Get current user's contacts.
router.get('/', verifyToken, async (req, res) => {
  try {
    const { username } = req;
    // Find user.
    const user = await User.findOne({ username });
    
    // If user not found, respond with an error.
    if (!user) return res.status(400).end();
    // Else respond with contacts.
    res.json(user.contacts);
  } catch (err) {
    res.status(500).end();
  }
});

// @route   POST /api/contacts
// @access  private
// Add given user to current user's contacts.
router.post('/', verifyToken, async (req, res) => {
  try {
    const { username } = req; // current user
    const { userToAdd } = req.body;
    // Add given username to current user's contacts.
    const query = await User.updateOne(
      { username }, 
      { $addToSet: { contacts: userToAdd } }
    );

    // If user not found, respond with an error.
    if (!query.n) return res.status(400).end();
    // Else respond with an OK.
    res.end();

  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;