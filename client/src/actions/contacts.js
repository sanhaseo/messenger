import axios from 'axios';
import { SET_CONTACTS, CLEAR_CONTACTS, ADD_CONTACT } from './actionTypes';

const setContacts = contacts => ({
  type: SET_CONTACTS,
  contacts
});

const clearContacts = () => ({
  type: CLEAR_CONTACTS
});

const addContact = contact => ({
  type: ADD_CONTACT,
  contact
});

// Get all contacts of the current user.
export const getContacts = () => {
  return async dispatch => {
    try {
      // Request server to get all contacts.
      const res = await axios.get(
        '/api/contacts/',
        { withCredentials: true }
      );
      
      // If successful, set contacts in client state.
      dispatch(setContacts(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

// For redux-thunk.
export const clearContactsWrapper = () => {
  return dispatch => dispatch(clearContacts());
};

// Add given user to the current user's contact list.
export const addContactToServer = userToAdd => {
  return async dispatch => {
    try {
      
      // Request server to add contact.
      const data = { userToAdd }
      await axios.post(
        '/api/contacts', 
        data,
        { withCredentials: true }
      );
      
      // If successful, add contact to client state.
      dispatch(addContact(userToAdd));
    } catch (err) {
      console.log(err);
    }
  };
};

// Request server to search for a user with given username.
// Return true if found. Else return false.
// Does not dispatch any action.
export const searchUser = async username => {
  try {
    const userExists = await axios.get(`/api/users/${username}`);
    if (userExists) return true;
    return false;
  } catch (err) {
    return false;
  }
};