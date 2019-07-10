import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Main from '../components/Main';
import Navbar from '../components/Navbar';

const MainPage = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Fragment>
      <Navbar />
      <Main />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MainPage);