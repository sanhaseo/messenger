import React, { useEffect } from 'react';
// components
import ChatPanel from './chatPanel/ChatPanel'
import SidePanel from './sidePanel/SidePanel'
// redux
import { connect } from 'react-redux';
import {
  getConversations,
  addConversationWrapper,
  addMessageWrapper,
  updateLastMessageReadToServer
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
  getConversations, 
  getContacts, 
  addConversationWrapper,
  addMessageWrapper,
  updateLastMessageReadToServer
}) => {
  const socket = io();

  // On mount, get user data from server.
  useEffect(() => {
    getConversations();
    getContacts();
    // Disconnect socket before unmount.
    return () => socket.disconnect();
  }, [getConversations, getContacts, socket]);

  // On incoming new conversation, add conversation to client state.
  socket.on('conversation', data => {
    handleNewConversation(data, addConversationWrapper);
  });
  // On incoming message, add message to client state.
  socket.on('message', data => {
    handleNewMessage(
      data, 
      addMessageWrapper,
      updateLastMessageReadToServer
    );
  });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SidePanel />
      <ChatPanel />
    </div>
  );
};

export default connect(
  null,
  { 
    getConversations, 
    getContacts, 
    addConversationWrapper,
    addMessageWrapper,
    updateLastMessageReadToServer 
  }
)(Main);