import { SET_CURRENT_USER, CLEAR_USER } from '../actions/actionTypes';
import axios from 'axios';

// test
import { testGetUser } from '../testDB';

const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

const clearUser = () => ({
  type: CLEAR_USER
});

// UNFINISHED
// Request server to register user with
// the given data.
// data should be { username, password }
export const register = data => {
  return async dispatch => {
    try {
      // Server request.
      const res = await axios.post('/auth/register', data);

      // If register successful, set current user.
      dispatch(setCurrentUser(res.data));

      // Clear error here...
    } catch (err) {
      
      // Set error here...

      // test
      console.log(err);
    }
  };
};

// UNFINISHED
// Request server to login user with
// the given credentials.
// data should be { username, password }
export const login = data => {
  return async dispatch => {
    try {

      // Server request.
      const res = await axios.post('/auth/login', data);

      // If login successful, set current user.
      dispatch(setCurrentUser(res.data));

      // Clear error here...
    } catch (err) {

      // Set error here...

      // test
      console.log(err);
    }
  };
};

// Request server to verify the JWT.
// If successfully verified, set current user.
export const verifyUser = () => {
  return async dispatch => {
    try {

      // Server request goes here...

      // test
      const user = { name: 'sanha' };
      dispatch(setCurrentUser(user));
    } catch (err) {
      console.log(err);
    }
  };
};