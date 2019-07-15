import React, { useEffect } from 'react';
// components
import ChatPanel from './chatPanel/ChatPanel'
import SidePanel from './sidePanel/SidePanel'
// redux
import { connect } from 'react-redux';
import {
  getConversations,
  addConversationWrapper,
  addMessageWrapper
} from '../actions/conversations';
import { getContacts } from '../actions/contacts';
// styles
import { makeStyles } from '@material-ui/core/styles';
// socket.io
import io from 'socket.io-client';
import { 
  handleNewConversation, 
  handleNewMessage 
} from '../helpers/socketHandlers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    bottom: 0,
    display: 'flex',
  },
}));

const Main = ({ 
  username, 
  getConversations, 
  getContacts, 
  addConversationWrapper,
  addMessageWrapper 
}) => {
  // On mount, get user data from server.
  useEffect(() => {
    getConversations(username);
    getContacts();
  }, [username, getConversations, getContacts]);

  const socket = io();
  // On incoming new conversation, add conversation to client state.
  socket.on('conversation', data => {
    handleNewConversation(data, username, addConversationWrapper);
  });
  // On incoming message, add message to client state.
  socket.on('message', data => {
    handleNewMessage(data, addMessageWrapper);
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
  username: state.auth.username
});

export default connect(
  mapStateToProps,
  { 
    getConversations, 
    getContacts, 
    addConversationWrapper,
    addMessageWrapper 
  }
)(Main);