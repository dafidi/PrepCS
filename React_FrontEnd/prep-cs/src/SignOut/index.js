import React from 'react';
import Firebase from '../Firebase';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={Firebase.doSignOut}>
    Sign Out
  </button>
);

export { SignOutButton };
