import { SET_CURRENT_CONVERSATION } from './actionTypes';

// Set the current conversation to be displayed.
export const setCurrentConversation = id => ({
  type: SET_CURRENT_CONVERSATION,
  id
});