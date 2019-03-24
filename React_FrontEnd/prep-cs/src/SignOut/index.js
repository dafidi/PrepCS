import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

class SignOutButtonBase extends React.Component {
  render() {
    return (
      <button type="button" class="btn btn-secondary" onClick={this.props.firebase.doSignOut}>
        Sign Out
      </button>
    );
  }

}

const SignOutButton = compose(
  withRouter,
  withFirebase
)(SignOutButtonBase);

export { SignOutButton };
