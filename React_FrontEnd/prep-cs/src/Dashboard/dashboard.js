import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class DashboardComponentBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        uid: null
      },
      problemsUserHasAttempted: [],
      problemsUserHasAttemptedSuccessfully: [],
      numberOfProblemsUserHasAttempted: null,
      numberOfProblemsUserHasAttemptedSuccessfully: null
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({userInfo: {uid: this.props.firebase.getUid()} });
        this.props.firebase.fs_user(this.state.userInfo.uid)
        .get()
        .then((doc) => {
          let userData = doc.data();
          this.setState({
            problemsUserHasAttempted: userData.problems_attempted,
            problemsUserHasAttemptedSuccessfully: 
              userData.problems_attempted_successfully,
            numberOfProblemsUserHasAttempted:
              userData.problems_attempted.length,
            numberOfProblemsUserHasAttemptedSuccessfully:
             userData.problems_attempted_successfully.length
          });

        })
        .catch((error) => { console.warn(error); });
      } else {
        // Don't do anything, user info not available yet
      }
    });
    
    // this.props.firebase.fs_user()
  }

  render() {

    return (
      <div>
        <h2>This is your dashboard.</h2>
        <h2>You've attempted {this.state.numberOfProblemsUserHasAttempted} problem{this.state.numberOfProblemsUserHasAttempted === 1 ? "" :"s" }.</h2>
        {
          
          this.state.numberOfProblemsUserHasAttempted === this.state.numberOfProblemsUserHasAttemptedSuccessfully
          ? <h2>You've completed all {this.state.numberOfProblemsUserHasAttempted} problems</h2>
          : <h2>You've completed {this.state.numberOfProblemsUserHasAttemptedSuccessfully} of them</h2>
        }
      </div>
    )
  }
}

const DashboardComponent = compose(
  withRouter,
  withFirebase
)(DashboardComponentBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DashboardComponent);
