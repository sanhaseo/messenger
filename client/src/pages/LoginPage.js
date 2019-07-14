import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register, login } from '../actions/auth';

const LoginPage = ({ isAuthenticated, register, login }) => {
  // test
  const [input, setInput] = useState({ register: '', login: '' });

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  // test
  const handleChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  // test
  const handleRegisterSubmit = event => {
    event.preventDefault();
    const user = { username: input.register };
    register(user);
  };
  // test
  const handleLoginSubmit = event => {
    event.preventDefault();
    const user = { username: input.login };
    login(user);
  };

  return (
    <Fragment>
      <form onSubmit={handleRegisterSubmit}>
        <label>Register</label>
        <input 
          type='text' 
          name='register' 
          value={input.register} 
          onChange={handleChange} 
        />
        <button type='submit'>Register</button>
      </form>
      <hr />
      <form onSubmit={handleLoginSubmit}>
        <label>Login</label>
        <input 
          type='text' 
          name='login'
          value={input.login} 
          onChange={handleChange} 
        />
        <button type='submit'>Login</button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, login })(LoginPage);