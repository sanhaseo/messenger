import axios from 'axios';
import {
  SET_CONVERSATIONS, 
  ADD_CONVERSATION, 
  ADD_PARTICIPANTS,
  ADD_MESSAGE
} from './actionTypes';

const setConversations = conversations => ({
  type: SET_CONVERSATIONS,
  conversations
});

// Add given conversation to client state.
const addConversation = conversation => ({
  type: ADD_CONVERSATION,
  conversation
});

// Add participants to given conversation(id).
const addPaticipants = (_id, participants) => ({
  type: ADD_PARTICIPANTS,
  _id,
  participants
});

// Add message to given conversation(id).
const addMessage = (_id, message) => ({
  type: ADD_MESSAGE,
  _id,
  message
});

// Request server for current user's conversations.
export const getConversations = username => {
  return async dispatch => {
    try {
      // Request server to get all conversations for current user.
      const res = await axios.get(
        '/api/conversations/',
        { withCredentials: true }
      );

      // Remove current user from each participants array.
      const conversations = res.data.map(conversation => ({
        ...conversation,
        participants: conversation.participants.filter(
          participant => participant !== username
        ).sort()
      }));
      // Set conversations in client state.
      dispatch(setConversations(conversations));
    } catch (err) {
      console.log(err);
    }
  };
};

// Add a new conversation with given participants to server.
// Does not dispatch any action, since response will be emitted via socket.io.
export const addConversationToServer = async participants => {
  try {
    // Request server to add new conversatoin.
    await axios.post(
      '/api/conversations', 
      participants,
      { withCredentials: true }
    );

  } catch (err) {
    console.log(err);
  }
};

export const addConversationWrapper = conversation => {
  return dispatch => dispatch(addConversation(conversation));
};

// Request server to add given message to given conversation(id).
// Does not dispatch any action, since response will be emitted via socket.io.
export const addMessageToServer = async (_id, message) => {
  try {
    const data = { _id, message };

    await axios.post(
      '/api/messages', 
      data,
      { withCredentials: true }
    );

  } catch (err) {
    console.log(err);
  }
};

export const addMessageWrapper = (_id, message) => {
  return dispatch => dispatch(addMessage(_id, message));
};