import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';

class ProblemsComponentBase extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => <div><h3>Problems Page. List of Problems is shown here.</h3></div>}
      </AuthUserContext.Consumer>
    )
  }
}

const ProblemsComponent = compose(
  withRouter,
  withFirebase
)(ProblemsComponentBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProblemsComponent);
