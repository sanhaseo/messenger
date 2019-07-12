import React, { useEffect } from 'react';
// components
import ChatPanel from './chatPanel/ChatPanel'
import SidePanel from './sidePanel/SidePanel'
// redux
import { connect } from 'react-redux';
import { addMessageWrapper, getConversations } from '../actions/conversations';
import { getContacts } from '../actions/contacts';
// styles
import { makeStyles } from '@material-ui/core/styles';

import io from 'socket.io-client';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'absolute',
    top: 50,
    bottom: 0,
    flexGrow: 1,
    display: 'flex',
  },
});

const Main = ({ username, getConversations, getContacts, addMessageWrapper }) => {
  // UNFINISHED
  // When JWT is implemented, user id in JWT should
  // be used instead of current username.
  //
  // On mount, get user data from server.
  useEffect(() => {
    getConversations(username);
    getContacts(username);
  }, [username, getConversations, getContacts]);
  
  // On incoming message, add message to client state.
  const socket = io();
  socket.on('message', data => {
    const { _id, message } = data;
    addMessageWrapper(_id, message);
  });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SidePanel />
      <ChatPanel />
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.auth.user.name
});

export default connect(
  mapStateToProps,
  { getConversations, getContacts, addMessageWrapper }
)(Main);