const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Conversation schema
const conversationSchema = new Schema({
  participants: {
    type: [String],
    unique: true
  },
  messages: [
    {
      username: String,
      text: String,
      date: Number
    }
  ]
});

// Conversation model
const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;