// On incoming new conversation, add conversation to client state.
export const handleNewConversation = (
  data, 
  username, 
  addConversationWrapper
) => {
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
export const handleNewMessage = (data, addMessageWrapper) => {
  const { _id, message } = data;
  addMessageWrapper(_id, message);
};