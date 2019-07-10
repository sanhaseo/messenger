import React from 'react';
// styles
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid #c4c4c4',
    width: '100vw',
    height: 50,
    padding: theme.spacing(1, 5),
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
  },
  loginButton: {
    marginRight: theme.spacing(2),
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        CHAT
      </Typography>
      <Button 
        variant='outlined' 
        color='primary' 
        className={classes.loginButton}
      >
        Log In
      </Button>
      <Button color='primary'>Sign Up</Button>
    </div>
  );
};

export default Navbar;