import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../actions/auth';

const LoginPage = ({ isAuthenticated, login }) => {
  // test
  const [input, setInput] = useState({ 
    username: '', 
    password: '' 
  });

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  // test
  const handleChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  // test
  const handleSubmit = event => {
    event.preventDefault();
    login(input);
  };

  return (
    <Fragment>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          type='text' 
          name='username' 
          value={input.username} 
          onChange={handleChange} 
        />
        <br />
        <label>Password</label>
        <input 
          type='password' 
          name='password' 
          value={input.password} 
          onChange={handleChange} 
        />
        <br />
        <button type='submit'>Login</button>
      </form>
      <Link to='/register'>Don't have an account? Sign Up</Link>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginPage);