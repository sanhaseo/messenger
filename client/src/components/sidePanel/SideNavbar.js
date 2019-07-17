import React from 'react';
// redux
import { connect } from 'react-redux';
// styles
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Badge from '@material-ui/core/Badge';

const AntTab = withStyles({
  root: {
    minWidth: 'auto',
    height: 70,
    flexGrow: 1,
  },
})(Tab);

const useStyles = makeStyles(theme => ({
  root: {
    height: 70,
    flexShrink: 0,
    borderBottom: '1px solid #c4c4c4',
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
}));

const SideNavbar = ({ tab, onChange, conversations }) => {
  // Total number of unread message across all conversations.
  // let unreadMessages = 0;
  // if (conversations.length !== 0) {
  //   unreadMessages = conversations.reduce(
  //     (total, conversation) => total + (conversation.messages.length - conversation.lastMessageRead),
  //     0
  //   );
  // }
  const unreadMessages = conversations.reduce(
    (total, conversation) => total + (conversation.messages.length - conversation.lastMessageRead),
    0
  );
  // console.log(unreadMessages)

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Tabs
        value={tab}
        onChange={onChange}
        indicatorColor='primary'
        textColor='primary'
      >
        <AntTab 
          icon={
            <Badge 
              color='secondary' 
              badgeContent={unreadMessages}
              invisible={unreadMessages === 0}
            >
              <ChatOutlinedIcon />
            </Badge>
          } 
          disableRipple 
        />
        <AntTab icon={<PersonOutlineIcon />} disableRipple />
      </Tabs>
    </div>
  );
}

const mapStateToProps = state => ({
  conversations: state.conversations
});

export default connect(mapStateToProps)(SideNavbar);