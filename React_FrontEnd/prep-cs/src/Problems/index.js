import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';

import { NavLink } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { ProblemListCard } from './problem-list-card';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import Collapsible from 'react-collapsible';

class ProblemsComponentBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfProblems: [],
      problemListViews: null,
      problemTablePage: 0,
      uid: null,
      problemsUserHasSolved: [],
      problemsByCategory: {},
      categories: []
    };
  }

  componentDidMount = () => {
    let problemsByCategory = { "Miscellaneous": [] };
    this.props.firebase.fs_problems()
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().category) {
            if (problemsByCategory[doc.data().category]) {
              problemsByCategory[doc.data().category].push(
                { "id": doc.id, "data": doc.data() }
              );
            } else {
              problemsByCategory[doc.data().category] = [{
                "id": doc.id,
                "data": doc.data()
              }];
            }

          } else {
            problemsByCategory["Miscellaneous"].push(
              { "id": doc.id, "data": doc.data() }
            );
          }
        });
        this.setState({ problemsByCategory: problemsByCategory });
        this.setState({ categories: Object.keys(problemsByCategory) });
      })
      .catch((error) => { console.warn(error); });

    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: this.props.firebase.getUid() });

        this.props.firebase.fs_user(this.state.uid)
          .get()
          .then((doc) => {
            const userData = doc.data();
            if (userData.problems_attempted_successfully) {
              this.setState({ problemsUserHasSolved: userData.problems_attempted_successfully });
            }
          })
          .catch((error) => {
            // Uncaught errors can be problematic.
          });
      } else {

      }
    });

  }

  handleChangePage = (event, page) => {
    this.setState({ problemTablePage: page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ problemTablePage: 0, rowsPerPage: event.target.value });
  };

  render() {
    return (
      <AuthUserContext.Consumer>
        {
          authUser => authUser ?
            <div>
              {
                this.state.categories.slice().map((category) => (
                  <NavLink key={category} to={ROUTES.COURSE + "/" + category}>
                    <p key={category}>{category}</p>
                  </NavLink>
                )
                )
              }
            </div> : <div></div>
        }
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
