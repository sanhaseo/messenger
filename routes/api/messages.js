// Bypass token verificatoin for now...

const express = require('express');
const router = express.Router();

// Conversation model
const Conversation = require('../../models/Conversation');

module.exports = io => {
  // UNFINISHED
  // Verify token.
  // Emit message to connected clietns.
  //
  // @route   POST /api/messages
  // @access  private
  // Push given message to given conversation.
  router.post('/', async (req, res) => {
    try {
      const { _id, message } = req.body;

      // Find conversation by id and push message.
      await Conversation.findByIdAndUpdate(
        _id, 
        { $push: { messages: message } },
        { new: true }
      );

      // If successful, emit message to conversation participants
      // that are connected.
      const conversation = await Conversation.findById(_id);
      const { participants } = conversation;
      
      // Socket io emit here...
      const data = { _id, message }
      io.emit('message', data);

      // Respond with an OK.
      res.end();

    } catch (err) {
      res.status(400).end();
    }
  });

  return router;
};