import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class DashboardComponentBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {}
    };
  }

  render() {
    return (
      <div><h2>This is your dashboard.</h2></div>
    )
  }
}

const DashboardComponent = compose(
  withRouter,
  withFirebase
)(DashboardComponentBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DashboardComponent);
