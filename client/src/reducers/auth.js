import { SET_CURRENT_USER, CLEAR_USER } from '../actions/actionTypes';

const defaultState = {
  isAuthenticated: false,
  user: {}
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    case CLEAR_USER:
      return {
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};

export default auth;