import React from 'react';
import Demo_Problem from '../Problems/demo_problem';
import ProblemsComponent from '../Problems';
import DashboardComponent from '../Dashboard';
import HomeBar from '../Navigation';
import ProblemDetail from '../Problems/problem-detail';
import { SignInPage } from '../SignIn';
import { SignUpPage } from '../SignUp';
import { AuthUserContext, withAuthentication } from '../Session';
import { EventsPage } from '../Events';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './index.css';

import 'brace/mode/python';
import 'brace/theme/solarized_dark';

class HomePage extends React.Component {
  render() {
    return (
      <Router>
        <div className="homePage">
          <HomeBar authUser={this.props.authUser} />
          <Route path="/" exact component={HomeBody}></Route>
          <Route path="/signin" exact component={SignInPage}></Route>
          <Route path="/signup" exact component={SignUpPage}></Route>
          <Route path="/problems" exact component={ProblemsComponent}></Route>
          <Route path="/demo-problem" exact component={Demo_Problem}></Route>
          <Route path="/problem-detail/:problem_id" component={ProblemDetail}></Route>
          <Route path="/events" exact component={EventsPage}></Route>
          <Route path="/dashboard" exact component={DashboardComponent}></Route>
        </div>
      </Router>
    );
  }
}

class HomeBody extends React.Component {
  render() {
    return (
      <div className="homeBody">
        <div className="jumbotron">
          <h1 className="display-3">Welcome to PrepCS!</h1>
          <p className="lead">PrepCS is web service aimed at providing Computer Science students at Howard University a personalized career development platform on 3 major fronts:</p>
          <hr className="my-4"></hr>
          <div className="list-group">
            <a href="/" style={{ color: "white", backgroundColor: "#F3969A" }} className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Coding Interview Readiness</h5>
              </div>
              <p className="mb-1">Prepares you for Technical and Behavioral Interviews.</p>
            </a>
            <a href="/" className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">Resume Building</h5>
              </div>
              <p className="mb-1">Stand out from the crowd and your fellow peers.</p>
            </a>
            <a href="/" className="list-group-item list-group-item-action flex-column align-items-start active">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">CS-Related Event Tracking</h5>
              </div>
              <p className="mb-1">Always be in the know to further your career goals.</p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {

  render() {
    return (
      <AuthUserContext.Consumer>
        {
          authUser => {
            return (<HomePage authUser={authUser} />);
          }
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default withAuthentication(App);
