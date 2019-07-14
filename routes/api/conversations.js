// Bypass token verificatoin for now...

const express = require('express');
const router = express.Router();

// User and Conversation models
const User = require('../../models/User');
const Conversation = require('../../models/Conversation');

module.exports = io => {
  // UNFINISHED
  // When JWT is implemented, user id in JWT should
  // be used instead of current username.
  //
  // @route   GET /api/conversations
  // @access  private
  // Return current user's conversations.
  router.get('/:username', async (req, res) => {
    try {
      const { username } = req.params;

      // Get user.
      const user = await User.findOne({ username });
      // Get user's conversations.
      const conversations = await Conversation.find(
        { _id: { $in: user.conversations } }
      );

      // Respond with conversations.
      res.json(conversations);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // @route   POST /api/conversations
  // @access  private
  // Create a new conversation with given participants,
  // and emit conversation to connected clients.
  router.post('/', async (req, res) => {
    try {
      const participants = req.body;

      // Check if a conversation with the same participants already exists.
      const conversation = await Conversation.findOne({ participants });
      // If so, respond with the found conversation.
      // if (conversation) return res.json(conversation);

      // If conversation exists, respond with an error.
      if (conversation) return res.status(400).end();

      // Elss, create a new conversation with given participants.
      const newConversation = new Conversation({ participants });
      await newConversation.save();

      // Add conversation id to each participant in the conversation
      // plus the current user.
      await User.updateMany(
        { username: { $in: participants } }, 
        { $addToSet: { conversations: newConversation._id } }
      );

      // Emit conversation to connected clients.
      io.emit('conversation', newConversation);

      // Respond with an OK.
      res.end();
    } catch (err) {
      console.log(err)
      res.status(500).end();
    }
  });

  return router;
}