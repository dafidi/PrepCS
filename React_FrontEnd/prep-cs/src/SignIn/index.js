import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../constants/routes';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';

const SignInPage = () => (
  /* Change minHeight later. Remove width styling for Mobile.*/
  <div style={{minHeight: "900px", backgroundColor: "#002a42"}}>
  <div className="card text-white bg-primary mb-3" style={{boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", top: "50%", left: "50%", transform: "translate(-50%, 50%)", width: "50%"}}>
  <div className="card-header">
    <h3 style={{textAlign: 'center'}}>Sign In<small className="text-muted"> to PrepCS</small></h3>
    </div>
    <div className="card-body">
    <SignInForm />
    <br></br>
    <SignUpLink />
    </div>
  </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props }
    this.state = { width: '1920' };
    this.state = { height: '1080' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = { ...INITIAL_STATE };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Email Address</span>
            </div>
        <input className="form-control"
          name="email"
          id="sign-in"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Enter Email Address Here"
        />
        </div>
        
        <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
        <input className="form-control"
          name="password"
          id="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Enter Password Here"
        />
        </div>
        <div style={{textAlign: 'center'}}>
        <button disabled={isInvalid} type="submit" className="btn btn-secondary">
          Sign In
        </button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export { SignInForm, SignInPage };
