import store from '../store';

// On incoming new conversation, add conversation to client state.
export const handleNewConversation = (
  data, 
  addConversationWrapper
) => {
  const username = store.getState().auth.username;

  // If the current user is not in conversation, return.
  if (!data.participants.includes(username)) return;

  // Remove current user from participants array.
  const participants = data.participants.filter(
    participant => participant !== username
  ).sort();

  // Add conversation to client state.
  const conversation = {
    ...data,
    participants
  };
  addConversationWrapper(conversation);
};

// On incoming message, add message to client state.
// If the message is for current conversation, update last message read.
export const handleNewMessage = async (
  data, 
  addMessageWrapper,
  updateLastMessageReadToServer
) => {
  // Conversation id and message.
  const { _id, message } = data;
  addMessageWrapper(_id, message);

  const { conversations, currentConversation } = store.getState();

  // If message is for current conversation, update last message read.
  if (_id === currentConversation) {
    const lastMessageRead = conversations.find(
      conversation => conversation._id === _id
    ).messages.length;
    await updateLastMessageReadToServer(_id, lastMessageRead);
  }
};