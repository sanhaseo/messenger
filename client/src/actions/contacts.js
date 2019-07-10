import axios from 'axios';
import { SET_CONTACTS, ADD_CONTACT } from './actionTypes';

const setContacts = contacts => ({
  type: SET_CONTACTS,
  contacts
});

const addContact = contact => ({
  type: ADD_CONTACT,
  contact
});

// UNFINISHED
// When JWT is implemented, user id in JWT should
// be used instead of current username.
// Handle error.
//
// Get all contacts of the current user.
export const getContacts = username => {
  return async dispatch => {
    try {
      // Request server to get all contacts.
      // const res = await axios.get('/api/contacts/');
      const res = await axios.get(`/api/contacts/${username}`);
      
      // If successful, set contacts in client state.
      dispatch(setContacts(res.data));
    } catch (err) {
      console.log(err);
    }
  };
};

// UNFINISHED
// When JWT is implemented, user id in JWT should
// be used instead of current username.
// Handle error.
//
// Add given user to the current user's contact list.
export const addContactToServer = (name, currentUser) => {
  return async dispatch => {
    try {
      
      // Request server to add contact.
      const data = { name, currentUser }
      await axios.post('/api/contacts', data);
      
      // If successful, add contact to client state.
      dispatch(addContact(name));
    } catch (err) {
      console.log(err);
    }
  };
};