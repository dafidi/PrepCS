import React from 'react';
import { NavLink } from 'react-router-dom';
import { SignOutButton } from '../SignOut';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../constants/routes';

class Navigation extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li>
              <NavLink to={ROUTES.LANDING} className="nav-item active">
                <span className="navbar-brand">PrepCS</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={ROUTES.DASHBOARD}
                className="nav-link">
                Dashboard
						    </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={ROUTES.PROBLEMS}
                className="nav-link">
                Problems
					      </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={ROUTES.EVENTS}
                className="nav-link">
                Events
					      </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {this.props.userInfo && <span>Hi, {this.props.userInfo.username}<SignOutButton /></span>}
          </form>

        </div>
      </nav>
    );
  }
}

class HomeBarBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.authUser !== newProps.authUser) {
      if (!newProps.authUser) {
        this.setState({
          userInfo: null
        });
        return;
      }

      this.props.firebase.fs_user(newProps.authUser.uid)
        .get()
        .then(doc => {
          this.setState({
            userInfo: {
              username: doc.data().username
            }
          });
        })
        .catch(error => console.warn(error));
      } 
  }

  render() {
    return (
      <div className="homeBar">
        <Navigation userInfo={this.state.userInfo} />
      </div>
    );
  }
}

const HomeBar = compose(
  withRouter,
  withFirebase
)(HomeBarBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomeBar);
