import React from 'react';
// redux
import { connect } from 'react-redux';
import { setCurrentConversation } from '../../../actions/currentConversation';
// styles
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    height: 90,
    // borderBottom: '1px solid #c4c4c4',
    display: 'flex',
  },
  date: {
    marginTop: theme.spacing(1),
  },
}));

const ConversationItem = ({ 
  conversation, 
  currentConversation, 
  setCurrentConversation 
}) => {
  const _id = conversation._id;
  const participantsStr = conversation.participants.join(', ');
  const initial = participantsStr.charAt(0).toUpperCase(); // for avatar
  // Check if the messages array is empty.
  // If not, display the last message and date.
  let lastMsgText = '';
  let lastMsgDate = '';
  const { messages } = conversation;
  if (messages.length > 0) {
    const lastMsg = messages[messages.length - 1];
    lastMsgText = lastMsg.text;
    lastMsgDate = (new Date(lastMsg.date)).toLocaleDateString();
  }

  const classes = useStyles();
  return (
    <ListItem 
      button 
      alignItems="flex-start" 
      className={classes.root}
      selected={_id === currentConversation}
      onClick={() => setCurrentConversation(_id)}
    >
      <ListItemAvatar>
        <Avatar>{initial}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography noWrap={true}>
            <strong>{participantsStr}</strong>
          </Typography>
        }
        secondary={
          <Typography noWrap={true} color='textSecondary'>
            {lastMsgText}
          </Typography>
        }
      />
      <Typography variant='caption' className={classes.date}>
        {lastMsgDate}
      </Typography>
    </ListItem>
  );
};

const mapStateToProps = state => ({
  currentConversation: state.currentConversation
});

const mapDispatchToProps = dispatch => ({
  setCurrentConversation: _id => dispatch(setCurrentConversation(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationItem);