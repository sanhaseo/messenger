import React, { Fragment } from 'react';
// components
import ChatPanelHeader from './ChatPanelHeader';
import ChatArea from './ChatArea';
import TextInputBar from './TextInputBar';
// redux
import { connect } from 'react-redux';
// styles
import { makeStyles } from '@material-ui/core/styles';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(1, 2),
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    [theme.breakpoints.up('sm')]: {
      width: '70vw',
      flexShrink: 0,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
      flexShrink: 0,
    },
  },
  icon: {
    fontSize: 200,
    color: '#c4c4c4',
    alignSelf: 'center',
  },
}));

const ChatPanel = ({ currentConversation }) => {
  const classes = useStyles();
  
  let panelContent;
  // If no conversation is currently selected,
  // display empty panel with chat icon.
  if (currentConversation === null) {
    panelContent = (
      <div className={classes.root}>
        <ChatOutlinedIcon className={classes.icon} />
      </div>
    );
  } else {  // Else display current conversation.
    panelContent = (
      <div className={classes.root}>
        <ChatPanelHeader />
        <ChatArea />
        <TextInputBar />
      </div>
    );
  }

  return (
    <Fragment>
      <Hidden smUp>
        <Drawer
          variant='temporary'
          anchor='right'
          open={!!currentConversation}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {panelContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          variant='permanent'
          anchor='right'
          open
        >
          {panelContent}           
        </Drawer>
      </Hidden>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  currentConversation: state.currentConversation
});

export default connect(mapStateToProps)(ChatPanel);