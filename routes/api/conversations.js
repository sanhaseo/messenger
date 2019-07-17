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
      const conversationIds = user.conversations.map(
        conversation => conversation.conversationId
      );
      const conversations = await Conversation.find(
        { _id: { $in: conversationIds } }
      );

      // Include last read message index for each conversation.
      const conversationsWithInfo = conversations.map(
        (conversation, index) => ({
          ...conversation._doc,
          lastMessageRead: user.conversations[index].lastMessageRead
        })
      );

      // Respond with conversations.
      res.json(conversationsWithInfo);
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
      const conversationInfo = { 
        conversationId: newConversation._id, 
        lastMessageRead: 0 
      };
      await User.updateMany(
        { username: { $in: participants } }, 
        { $addToSet: { conversations: conversationInfo } }
      );

      // Emit conversation to connected clients.
      const newConversationWithInfo = {
        ...newConversation._doc,
        lastMessageRead: 0
      };
      io.emit('conversation', newConversationWithInfo);

      // Respond with an OK.
      res.end();
    } catch (err) {
      res.status(500).end();
    }
  });

  return router;
}