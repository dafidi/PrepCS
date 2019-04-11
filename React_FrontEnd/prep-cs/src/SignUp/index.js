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

const SignUpPageBase = () => (
  <div style={{width: "100%", overflow: "hidden"}}>
    <div className="jumbotron" style={{width: "50vw", float: "left"}} >
      <h1 className="display-3">Welcome to PrepCS!</h1>
      <p className="lead">PrepCS is web service aimed at providing Computer Science students at Howard University a personalized career development platform on 3 major fronts:</p>
      <hr className="my-4"></hr>
      <div className="list-group">
        <a href="/dashboard" style={{ color: "white", backgroundColor: "#e51937" }} className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Personalized Dashboard</h5>
          </div>
          <p className="mb-1">Analyzes your statistics to accelerate your preparation.</p>
        </a>
        <a href="/courses" className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">Coding Interview Readiness</h5>
          </div>
          <p className="mb-1">Prepares you for Technical and Behavioral Interviews.</p>
        </a>
        <a href="/events" className="list-group-item list-group-item-action flex-column align-items-start active">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">CS-Related Event Tracking</h5>
          </div>
          <p className="mb-1">Always be in the know to further your career goals.</p>
        </a>
      </div>
    </div>
    <div className="auth-box" style={{ float: "right", marginRight: "10vw"}}>
      <SignUpForm />
    </div>
  </div>
);


const SignUpLink = () => (
  <p style={{textAlign:'center'}}>
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
);

class SignUpForm extends Component {
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
        this.props.history.push(ROUTES.DASHBOARD);
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
      <div>
        <h1>SignUp</h1>
        <form onSubmit={this.onSubmit}>

        <div className="input-group mb-3">
            <div className="input-group-prepend">
        <span className="input-group-text">First Name</span>
      </div>
            <input className="form-control"
              name="firstName"
              value={firstName}
              onChange={this.onChange}
              type="text"
              placeholder="Enter Name Here"
            /><br></br>
          </div>

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
      </div>
    );
  }
}

const SignUpPage = compose(
  withRouter,
  withFirebase,
)(SignUpPageBase);

export { SignUpLink, SignUpPage };
