import React from 'react';
// redux
import { connect } from 'react-redux';
// styles
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  // Common styles for chat items
  root: {
    maxWidth: '70%',
    margin: theme.spacing(2),
  },
  message: {
    borderRadius: 15,
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
  // Styles for chat items sent (from current user).
  sent: {
    alignSelf: 'flex-end',
    // display: 'flex',
  },
  sentMessage: {
    background: '#c4e2ff',
  },
  sentDate: {
    textAlign: 'right',
  },
  // Styles for chat items received.
  received: {
    display: 'flex',
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight :theme.spacing(1),
    marginTop :theme.spacing(2),
    backgroundColor: '#3f51b5',
  },
  receivedMessage: {
    background: '#e8e8e8',
  },
  receivedDate: {
    textAlign: 'left',
  },
}));

const ChatItem = ({ message, currentUser }) => {
  const { username, text, date } = message;
  const initial = username.charAt(0).toUpperCase(); // for avatar
  const dateString = (new Date(date)).toLocaleString();

  // Check if the message is from the current user.
  const fromCurrentUser = username === currentUser;

  const classes = useStyles();
  // Display differnt chat items depending on whether
  // or not the message is from the current user.
  if (fromCurrentUser) {
    return (
      <div className={[classes.root, classes.sent].join(' ')}>
        <Typography 
          variant='body1' 
          className={[classes.message, classes.sentMessage].join(' ')}
        >
          {text}
        </Typography>
        <Typography variant='body2' className={classes.sentDate}>
          {dateString}
        </Typography>
      </div>
    );
  }

  return (
    <div className={[classes.root, classes.received].join(' ')}>
      <Avatar className={classes.avatar}>{initial}</Avatar>
      <div>
        <Typography variant='body1'>{username}</Typography>
        <Typography 
          variant='body1' 
          className={[classes.message, classes.receivedMessage].join(' ')}
        >
          {text}
        </Typography>
        <Typography variant='body2' className={classes.receivedDate}>
          {dateString}
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.username
});

export default connect(mapStateToProps)(ChatItem);