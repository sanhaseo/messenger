import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const defaultState = {
  auth: {
    isAuthenticated: false,
    user: {}
  },
  error: { message: null },
  contacts: [],
  conversations: [],
  currentConversation: null
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  defaultState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;