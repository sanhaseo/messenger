const express = require('express');
const router = express.Router();
const verifyToken = require('../../middlewares/verifyToken');

// Conversation model
const Conversation = require('../../models/Conversation');

module.exports = io => {
  // @route   POST /api/messages
  // @access  private
  // Add given message to given conversation, 
  // and emit message to connected clients.
  router.post('/', verifyToken, async (req, res) => {
    try {
      const { _id, message } = req.body;

      // Find conversation by id and push message.
      await Conversation.findByIdAndUpdate(
        _id, 
        { $push: { messages: message } },
        { new: true }
      );
      
      // If successful, emit message to connected clients.
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