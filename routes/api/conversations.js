const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');

// User and Conversation models
const User = require('../../models/User');
const Conversation = require('../../models/Conversation');

module.exports = io => {
  // @route   GET /api/conversations
  // @access  private
  // Return current user's conversations.
  router.get('/', verifyToken, async (req, res) => {
    try {
      const { username } = req;

      // Get user.
      const user = await User.findOne({ username });
      // Get user's conversations.
      const conversations = await Conversation.find(
        { _id: { $in: user.conversations } }
      );

      // Respond with conversations.
      res.json(conversations);
    } catch (err) {
      res.status(500).end();
    }
  });

  // @route   POST /api/conversations
  // @access  private
  // Create a new conversation with given participants,
  // and emit conversation to connected clients.
  router.post('/', verifyToken, async (req, res) => {
    try {
      const participants = req.body;

      // Check if a conversation with the same participants already exists.
      const conversation = await Conversation.findOne({ participants });

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