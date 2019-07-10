import { SET_ERROR, CLEAR_ERROR } from './actionTypes';

const setError = error => ({
  type: SET_ERROR,
  error
});

const clearError = () => ({
  type: CLEAR_ERROR
});