import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

class ProblemsComponentBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfProblems: [],
      problemListViews: null
    }
  }

  componentDidMount = () => {
    this.props.firebase.fs_problems()
      .get()
      .then(
        (snapshot) => snapshot.forEach(
          (doc) => {
            this.state.listOfProblems.push({"id": doc.id, "data": doc.data()});
          })
      )
      .then((snapshot) => {
        this.setState({
          problemListViews: this.state.listOfProblems.map(
            (problem, i) => {
              return <li key={i}>
              <NavLink to={ROUTES.PROBLEM_DETAIL+'/'+problem["id"]}
                  style={{ color: 'black' }}>
                  {problem["data"].shortName}
						</NavLink>  
            </li>
            })
        });
      })
      .catch();
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          <div>
            <h3>Problems Page. List of Problems is shown here.</h3>
              <ul>{this.state.problemListViews}</ul>
          </div>}
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
