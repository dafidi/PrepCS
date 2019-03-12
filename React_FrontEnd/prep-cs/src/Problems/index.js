import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';

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
            this.state.listOfProblems.push(doc.data());
          })
      )
      .then((snapshot) => {
        this.setState({
          problemListViews: this.state.listOfProblems.map(
            (problem) => {
              return <li>{problem.shortName}</li>
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
            <ul>{this.state.listOfProblems.map((problem, i) => {
              return (<li key={i}>{problem.shortName}</li>)
            })
            }
            </ul>
            <button onClick={() => console.log(this.state.problemListViews)}>show list</button>
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
