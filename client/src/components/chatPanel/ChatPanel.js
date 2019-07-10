import React from 'react';
// components
import ChatArea from './ChatArea';
import TextInputBar from './TextInputBar';
// redux
import { connect } from 'react-redux';
// styles
import { makeStyles } from '@material-ui/core/styles';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    // padding: theme.spacing(1, 2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  chatPanelHeader: {
    height: 70,
    borderBottom: '1px solid #c4c4c4',
    flexShrink: 0,
  },
  icon: {
    fontSize: 200,
    color: '#c4c4c4',
    alignSelf: 'center',
  },
}));

const ChatPanel = ({ currentConversation }) => {
  const classes = useStyles();

  // If no conversation is currently selected,
  // display empty panel with chat icon.
  if (currentConversation === null) {
    return (
      <div className={classes.root}>
        <ChatOutlinedIcon className={classes.icon} />
      </div>
    );
  }

  // Else display current conversation.
  return (
    <div className={classes.root}>
      <div className={classes.chatPanelHeader}></div>
      <ChatArea />
      <TextInputBar />
    </div>
  );
};

const mapStateToProps = state => ({
  currentConversation: state.currentConversation
});

export default connect(mapStateToProps)(ChatPanel);