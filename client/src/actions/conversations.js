import axios from 'axios';
import store from '../store';
import {
  SET_CONVERSATIONS, 
  CLEAR_CONVERSATIONS,
  ADD_CONVERSATION, 
  ADD_PARTICIPANTS,
  ADD_MESSAGE,
  UPDATE_LAST_MESSAGE_READ
} from './actionTypes';

const setConversations = conversations => ({
  type: SET_CONVERSATIONS,
  conversations
});

const clearConversations = () => ({
  type: CLEAR_CONVERSATIONS
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

// Set given conversation(id)'s last message to read in client state.
const updateLastMessageRead = (_id, lastMessageRead) => ({
  type: UPDATE_LAST_MESSAGE_READ,
  _id,
  lastMessageRead
});

// Request server for current user's conversations.
export const getConversations = () => {
  return async dispatch => {
    try {
      // Request server to get all conversations for current user.
      const res = await axios.get(
        '/api/conversations/',
        { withCredentials: true }
      );

      // Get current username.
      const username = store.getState().auth.username;

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

// For redux-thunk.
export const clearConversationsWrapper = () => {
  return dispatch => dispatch(clearConversations());
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

// For redux-thunk.
export const addConversationWrapper = conversation => {
  return dispatch => dispatch(addConversation(conversation));
};

// Request server to add given message to given conversation(id).
// Does not dispatch any action, since response will be emitted via socket.io.
export const addMessageToServer = async (_id, message) => {
  try {
    const data = { _id, message };

    await axios.post(
      '/api/conversations/messages', 
      data,
      { withCredentials: true }
    );

  } catch (err) {
    console.log(err);
  }
};

// For redux-thunk.
export const addMessageWrapper = (_id, message) => {
  return dispatch => dispatch(addMessage(_id, message));
};

// Request server to update the last message read for given
// conversation(id).
export const updateLastMessageReadToServer = (_id, lastMessageRead) => {
  return async dispatch => {
    try {
      // Update last message read in client state.
      dispatch(updateLastMessageRead(_id, lastMessageRead));

      // Request server to update last message read.
      const data = { _id, lastMessageRead };
      await axios.put(
        '/api/users/conversations',
        data,
        { withCredentials: true }
      );
      
    } catch (err) {
      console.log(err);
    }
  };
};