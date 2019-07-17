const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contacts: [String],
  // conversations: [Schema.Types.ObjectId]
  conversations: [
    {
      conversationId: Schema.Types.ObjectId,
      lastMessageRead: Number
    }
  ]
});

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;