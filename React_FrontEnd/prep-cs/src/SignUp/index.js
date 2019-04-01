import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../constants/routes';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  isProfessor: false,
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <div className="auth-box">
      <SignUpForm />
    </div>
  </div>
);


const SignUpLink = () => (
  <p>
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    // this.state = { ...INITIAL_STATE };
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      isProfessor: false,
      passwordOne: '',
      passwordTwo: '',
      error: null,
    };
  }

  onSubmit = event => {
    const { firstName, lastName, username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in Firebase realtime database
        return this.props.firebase.fs_users()
          .doc(authUser.user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            problems_attempted: [],
            problems_attempted_successfully: []
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      firstName,
      lastName,
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="auth-box-input">
          First Name<br></br>
          <input
            name="firstName"
            value={firstName}
            onChange={this.onChange}
            type="text"
            placeholder="First Name"
          /><br></br>
        </div>
        <div className="auth-box-input">
          Last Name<br></br>
          <input
            name="lastName"
            value={lastName}
            onChange={this.onChange}
            type="text"
            placeholder="Last Name"
          /><br></br>
        </div>
        <div className="auth-box-input">
          Username<br></br>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Username"
          /><br></br>
        </div>
        <div className="auth-box-input">
          Email Address<br></br>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          /><br></br>
        </div>
        <div className="auth-box-input">
          Password<br></br>
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          /><br></br>
        </div>
        <div className="auth-box-input">
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          /><br></br>
        </div>
        <div className="auth-box-input">
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export { SignUpForm, SignUpLink, SignUpPage };
