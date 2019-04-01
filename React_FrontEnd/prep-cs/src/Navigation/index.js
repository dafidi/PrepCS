import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { SignOutButton } from '../SignOut';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../constants/routes';

const Navigation = ({ authUser }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li>
          <NavLink to={ROUTES.LANDING} className="nav-item active">
            <span className="navbar-brand">PrepCS</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={ROUTES.PROBLEMS}
            className="nav-link">
            Problems
						    </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={ROUTES.DEMO_PROBLEM}
            className="nav-link">
            Demo Problem
					      </NavLink>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
        {authUser && <span><p>{authUser.userName}</p> <SignOutButton /></span>}
      </form>

    </div>
  </nav>
);

class HomeBar extends React.Component {

  render() {
    return (
      <div className="homeBar">
        <AuthUserContext.Consumer>
          {
            authUser => <Navigation authUser={authUser} />
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

export default Navigation;
export { HomeBar };
