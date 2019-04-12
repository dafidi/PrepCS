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

/* Shrink Width for Mobile */
class SignUpPageBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: this.props }
    this.state = { width: '1920' };
    this.state = { width: '1080' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {

    var Is_Mid_Desktop = this.state.width < 1300;
    var Is_Mobile_View = this.state.width < 700;
    var Page_Width = "" + this.state.width + "px"

    return (
      <div style={{ backgroundColor: "#002a42" }}>
        <br></br><br></br>
        <div className="jumbotron" style={ Is_Mobile_View ? { width: Page_Width, margin: "0px auto", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" } : { width: "800px", margin: "0px auto", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" }}>
          <h3 className="display-3" style={{fontSize: "2rem", color: "#003a63"}}>Welcome to PrepCS!</h3>
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
        <br></br><br></br>
        <div className="auth-box" style={Is_Mobile_View ? { margin: "0px auto", width: Page_Width } : { margin: "0px auto", width: "800px" }}>
          <SignUpForm />
        </div>
        <br></br><br></br>
      </div>);
  }
}


const SignUpLink = () => (
  <p style={{ textAlign: 'center' }}>
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
);

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props }
    this.state = { width: '1920' };
    this.state = { width: '1080' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

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

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
    
      var Is_Mid_Desktop = this.state.width < 1300;
      var Is_Mobile_View = this.state.width < 700;
    
    if (Is_Mobile_View == true){
      return (
        <div>
          <div className="card text-white bg-primary mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" }}>
            <div className="card-header">
              <h3 style={{ textAlign: 'center' }}>Sign Up<small className="text-muted"> to PrepCS</small></h3>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
  
                <div className="input-group mb-3">
                  <input className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter First Name Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">

                  <input className="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter Last Name Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">
                  <input className="form-control"
                    name="userName"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter Username Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">
                  <input className="form-control"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter Email Address Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">
                  <input className="form-control"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Enter Password Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">
                  <input className="form-control"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Retype Password Here"
                  /><br></br>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button disabled={isInvalid} type="submit" className="btn btn-secondary">
                    Sign Up
            </button>
            <br></br><br></br>
            <p style={{ textAlign: 'center' }}>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
                </div>
  
                {error && <p>{error.message}</p>}
              </form>
            </div>
          </div>
        </div>
      );
    }

    else {
      return (
        <div>
          <div className="card text-white bg-primary mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" }}>
            <div className="card-header">
              <h3 style={{ textAlign: 'center' }}>Sign Up<small className="text-muted"> to PrepCS</small></h3>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
  
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;First Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <input className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter First Name Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <input className="form-control"
                    name="lastName"
                    value={lastName}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter Last Name Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <input className="form-control"
                    name="userName"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter Username Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <input className="form-control"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Enter Email Address Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <input className="form-control"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Enter Password Here"
                  /><br></br>
                </div>
  
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Confirm Password&nbsp;</span>
                  </div>
                  <input className="form-control"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Retype Password Here"
                  /><br></br>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button disabled={isInvalid} type="submit" className="btn btn-secondary">
                    Sign Up
            </button>
            <br></br><br></br>
            <p style={{ textAlign: 'center' }}>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
                </div>
  
                {error && <p>{error.message}</p>}
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

const SignUpPage = compose(
  withRouter,
  withFirebase,
)(SignUpPageBase);

export { SignUpLink, SignUpPage };
