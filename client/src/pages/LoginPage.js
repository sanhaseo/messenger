import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register, login } from '../actions/auth';

const LoginPage = ({ isAuthenticated, register, login }) => {
  // test
  const [registerInput, setRegisterInput] = useState({ 
    username: '', 
    password: '' 
  });
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: ''
  });

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  // test
  const handleRegisterChange = event => {
    const { name, value } = event.target;
    setRegisterInput({ ...registerInput, [name]: value });
  };
  // test
  const handleLoginChange = event => {
    const { name, value } = event.target;
    setLoginInput({ ...loginInput, [name]: value });
  };
  // test
  const handleRegisterSubmit = event => {
    event.preventDefault();
    register(registerInput);
  };
  // test
  const handleLoginSubmit = event => {
    event.preventDefault();
    login(loginInput);
  };

  return (
    <Fragment>
      <h4>Register</h4>
      <form onSubmit={handleRegisterSubmit}>
        <label>Username</label>
        <input 
          type='text' 
          name='username' 
          value={registerInput.username} 
          onChange={handleRegisterChange} 
        />
        <br />
        <label>Password</label>
        <input 
          type='password' 
          name='password' 
          value={registerInput.password} 
          onChange={handleRegisterChange} 
        />
        <br />
        <button type='submit'>Register</button>
      </form>
      <hr />
      <h4>Login</h4>
      <form onSubmit={handleLoginSubmit}>
      <label>Username</label>
        <input 
          type='text' 
          name='username' 
          value={loginInput.username} 
          onChange={handleLoginChange} 
        />
        <br />
        <label>Password</label>
        <input 
          type='password' 
          name='password' 
          value={loginInput.password} 
          onChange={handleLoginChange} 
        />
        <br />
        <button type='submit'>Login</button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, login })(LoginPage);