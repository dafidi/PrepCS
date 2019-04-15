import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

class CourseProblemsComponentBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      easyProblems: [],
      mediumProblems: [],
      hardProblems: []
    };
  }

  componentDidMount = () => {

    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        const { course_id } = this.props.match.params;

        this.props.firebase.fs_problems().get()
          .then((snapshot) => {
            let easy = [];
            let medium = [];
            let hard = [];
            snapshot.forEach((doc) => {
              let problem = { id: doc.id, data: doc.data() };

              if (problem.data.category === course_id) {
                if (problem.data.difficulty === "easy") {
                  easy.push({ id: problem.id, data: problem.data });
                } else if (problem.data.difficulty === "medium") {
                  medium.push({ id: problem.id, data: problem.data });
                } else if (problem.data.difficulty === "hard") {
                  hard.push({ id: problem.id, data: problem.data });
                }
              } else {
                console.log(problem.data.category, course_id);
                // console.log(problem.category === course_id);
              }
            });
            this.setState({
              easyProblems: easy,
              mediumProblems: medium,
              hardProblems: hard,
            });
          })
          .catch((error) => { console.warn(error); });

      } else {

      }
    });
  }

  render() {
    console.log(this.state.hardProblems);
    return (
      <AuthUserContext.Consumer>
        {
          authUser => authUser ?
            <div>
              <div>
                <h2>Easy</h2>
                {
                  this.state.easyProblems.slice().map((problem) => (
                    <NavLink key={problem.id} to={ROUTES.PROBLEM_DETAIL + "/" + problem.id}><p>{problem.data.shortName}</p></NavLink>
                  ))
                }
              </div>
              <div>
                <h2>Medium</h2>
                {
                  this.state.mediumProblems.slice().map((problem) => (
                    <NavLink key={problem.id} to={ROUTES.PROBLEM_DETAIL + "/" + problem.id}><p>{problem.data.shortName}</p></NavLink>
                  ))
                }
              </div>
              <div>
                <h2>Hard</h2>
                {
                  this.state.hardProblems.slice().map((problem) => (
                    <NavLink key={problem.id} to={ROUTES.PROBLEM_DETAIL + "/" + problem.id}><p>{problem.data.shortName}</p></NavLink>))
                }
              </div>
            </div> : <div></div>
        }
      </AuthUserContext.Consumer>
    )
  }
}

const CourseProblemsComponent = compose(
  withRouter,
  withFirebase
)(CourseProblemsComponentBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CourseProblemsComponent);
