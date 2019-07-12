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
export const addMessage = (_id, message) => ({
  type: ADD_MESSAGE,
  _id,
  message
});

// UNFINISHED
// When JWT is implemented, user id in JWT should
// be used instead of current username.
// Handle error.
//
// Request server for current user's conversations.
export const getConversations = username => {
  return async dispatch => {
    try {
      // Request server to get all conversations for current user.
      const res = await axios.get(`/api/conversations/${username}`);

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

// UNFINISHED
// Handle error
//
// Add a new conversation with given participants on server.
export const addConversationToServer = (participants, username) => {
  return async dispatch => {
    try {
      // Request server to add new conversatoin.
      const res = await axios.post('/api/conversations', participants);

      // If successful, remove current user from participants
      // and add conversation to client state.
      const conversation = {
        ...res.data,
        participants: res.data.participants.filter(
          participant => participant !== username
        ).sort()
      }
      dispatch(addConversation(conversation));
    } catch (err) {
      console.log(err);
    }
  };
};

// Request server to add given message to given conversation(id).
export const addMessageToServer = (_id, message) => {
  return async dispatch => {
    try {
      const data = { _id, message };

      const res = await axios.post('/api/messages', data);

      // dispatch(addMessage(id, message));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addMessageWrapper = (_id, message) => {
  return dispatch => dispatch(addMessage(_id, message));
};