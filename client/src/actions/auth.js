import axios from 'axios';
import { SET_CURRENT_USER, CLEAR_USER } from '../actions/actionTypes';
import { setError, clearError } from './error';

const setCurrentUser = username => ({
  type: SET_CURRENT_USER,
  username
});

const clearUser = () => ({
  type: CLEAR_USER
});

// Request server to register user with given username and password.
// data should be { username, password }
export const register = data => {
  return async dispatch => {
    try {
      // Server request.
      const res = await axios.post('/auth/register', data);

      // If register successful, set current user.
      dispatch(setCurrentUser(res.data.username));
      dispatch(clearError());
    } catch (err) {
      dispatch(setError(`${err.response.data.message}. Please try again.`));
    }
  };
};

// Request server to login user with given username and password.
// data should be { username, password }
export const login = data => {
  return async dispatch => {
    try {
      // Server request.
      const res = await axios.post('/auth/login', data);

      // If login successful, set current user.
      dispatch(setCurrentUser(res.data.username));
      dispatch(clearError());
    } catch (err) {
      dispatch(setError(`${err.response.data.message}. Please try again.`));
    }
  };
};

// Request server to clear cookie.
export const logout = () => {
  return async dispatch => {
    try {
      await axios.get(
        '/auth/logout',
        { withCredentials: true }
      );
      dispatch(clearUser());
    } catch (err) {
      console.log(err);
    }
  };
};

// Request server to verify JWT.
// If successful, set current user.
export const verifyUser = () => {
  return async dispatch => {
    try {
      // Request server to verify JWT.
      const res = await axios.get(
        '/auth/verify',
        { withCredentials: true }
      );

      // If successful, set current user.
      if (res.data.isAuthenticated) dispatch(setCurrentUser(res.data.username));
      // Else, clear user.
      else dispatch(clearUser());

    } catch (err) {
      console.log(err);
    }
  };
};