const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');

// User model
const User = require('../../models/User');

// @route   GET /api/users/search/:username
// @access  private
// If user exists, respond with { username }.
// Else respond with an error.
router.get('/search/:username', verifyToken, async (req, res) => {
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

// @route   GET /api/users/contacts
// @access  private
// Get current user's contacts.
router.get('/contacts', verifyToken, async (req, res) => {
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

// @route   POST /api/users/contacts
// @access  private
// Add given user to current user's contacts.
router.post('/contacts', verifyToken, async (req, res) => {
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

// @route   PUT /api/users/conversations
// @access  private
// Update the last message read for given conversation(id).
router.put('/conversations', verifyToken, async (req, res) => {
  try {
    const { username } = req;

    // _id:             conversation id
    // lastMessageRead: index of last message read
    const {_id, lastMessageRead} = req.body;

    // Update last message read for given conversation(id).
    await User.updateOne(
      { username, 'conversations.conversationId': _id },
      { $set: { 'conversations.$.lastMessageRead': lastMessageRead } }
    );

    // Respond with an OK.
    res.end();
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;