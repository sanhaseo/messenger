import {
  SET_CONVERSATIONS,
  CLEAR_CONVERSATIONS,
  ADD_CONVERSATION,
  ADD_PARTICIPANTS,
  ADD_MESSAGE,
  UPDATE_LAST_MESSAGE_READ
} from '../actions/actionTypes';

const defaultState = [];

const conversations = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CONVERSATIONS:
      return action.conversations;
    case CLEAR_CONVERSATIONS:
      return [];
    case ADD_CONVERSATION:
      return [...state, action.conversation]; // TODO: sort by date
    case ADD_PARTICIPANTS:
      return state.map(conversation => {
        if (conversation._id === action._id) {
          return {
            ...conversation,
            participants: [...conversation.participants, ...action.participants].sort()
          };
        }
        return conversation;
      });
    case ADD_MESSAGE:
      return state.map(conversation => {
        if (conversation._id === action._id) {
          return {
            ...conversation,
            messages: [...conversation.messages, action.message]
          };
        }
        return conversation;
      });
    case UPDATE_LAST_MESSAGE_READ:
      return state.map(conversation => {
        if (conversation._id === action._id) {
          return {
            ...conversation,
            lastMessageRead: action.lastMessageRead
          };
        }
        return conversation
      });
    default:
      return state;
  }
};

export default conversations;