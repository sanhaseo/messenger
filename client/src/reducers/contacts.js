import { SET_CONTACTS, ADD_CONTACT } from '../actions/actionTypes';

const defaultState = [];

const contacts = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return action.contacts.sort();
    case ADD_CONTACT:
      return [...state, action.contact].sort();
    default:
      return state;
  }
};

export default contacts;