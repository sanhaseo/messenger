import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { register } from '../actions/auth';

const RegisterPage = ({ isAuthenticated, register }) => {
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
    register(input);
  };

  return (
    <Fragment>
      <h4>Register</h4>
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
        <button type='submit'>Register</button>
      </form>
      <Link to='/login'>Already have an account? Sign In</Link>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(RegisterPage);