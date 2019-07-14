import React, { useEffect } from 'react';
// routes
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
// redux
import { connect } from 'react-redux';
import { verifyUser } from './actions/auth';
// styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
  },
});

const App = ({ verifyUser }) => {
  // Request server to verify JWT.
  // If successful, set current user.
  // useEffect(() => {verifyUser()}, [verifyUser]);
  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/login' component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default connect(null, { verifyUser })(App);
