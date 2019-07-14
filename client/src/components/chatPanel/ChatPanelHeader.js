import React from 'react';
// redux
import { connect } from 'react-redux';
import { setCurrentConversation } from '../../actions/currentConversation';
// styles
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    height: 70,
    padding: theme.spacing(1, 2),
    // borderBottom: '1px solid #c4c4c4',
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const ChatPanelHeader = ({ 
  conversations, 
  currentConversation, 
  setCurrentConversation 
}) => {
  // Current conversation's participants.
  const participantsStr = conversations.find(
    conversation => conversation._id === currentConversation
  ).participants.join(', ');

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <IconButton onClick={() => setCurrentConversation(null)}>
        <ChevronLeftIcon />
      </IconButton>

      <Typography variant='h6' noWrap={true}>
        {participantsStr}
      </Typography>

      <IconButton color='primary'>
        <AccountCircleIcon />
      </IconButton>
    </div>
  );
};

const mapStateToProps = state => ({
  conversations: state.conversations,
  currentConversation: state.currentConversation
});

const mapDispatchToProps = dispatch => ({
  setCurrentConversation: _id => dispatch(setCurrentConversation(_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPanelHeader);