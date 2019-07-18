import React, { useEffect, useRef } from 'react';
// components
import ChatItem from './ChatItem';
// redux
import { connect } from 'react-redux';
// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    overflowY: 'auto',
    borderBottom: '1px solid #c4c4c4',
    display: 'flex',
    flexDirection: 'column',
  },
});

const ChatArea = ({ messages }) => {
  // Scroll chat area to bottom when message is added.
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView();
  };
  useEffect(scrollToBottom, [messages]);
  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {// Map each message to a ChatItem.
        messages.map((message, index) => (
          <ChatItem key={index} message={message} />
      ))}
      <div ref={messageEndRef} />
    </div>
  );
};

// Return messages of the currently selected conversation.
const mapStateToProps = state => {
  const messages = state.conversations.find(
    conversation => conversation._id === state.currentConversation
  ).messages;
  
  return { messages };
};

export default connect(mapStateToProps)(ChatArea);