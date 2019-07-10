import React from 'react';
// styles
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    height: 70,
    // borderBottom: '1px solid #c4c4c4',
  },
  text: {
    marginTop: theme.spacing(2),
  }
}));

const ContactItem = ({ name }) => {
  const initial = name.charAt(0).toUpperCase();  // for avatar
  
  const classes = useStyles();
  return (
    <ListItem button alignItems="flex-start" className={classes.root}>
      <ListItemAvatar>
        <Avatar>{initial}</Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.text}
        primary={
          <Typography noWrap={true}>
            <strong>{name}</strong>
          </Typography>
        }
      />
    </ListItem>
  );
};

export default ContactItem;