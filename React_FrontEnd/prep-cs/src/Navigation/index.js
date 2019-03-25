import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { SignOutButton } from '../SignOut';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../constants/routes';

const Navigation = ({ authUser }) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="navbar-nav mr-auto">
        <span className="Nav_link">
          <NavLink to={ROUTES.LANDING}
            className="nav-link">
            PrepCS
						      </NavLink>
        </span>
        <span className="Nav_link">
          <NavLink to={ROUTES.PROBLEMS}
            className="nav-link">
            Problems
							    </NavLink>
        </span>
        <span className="Nav_link" >
          <NavLink to={ROUTES.DEMO_PROBLEM}
            className="nav-link">
            Demo Problem
						      </NavLink>
        </span>
        {authUser && <SignOutButton/>}
      </div>
    </nav>
  </div>
);

class HomeBar extends React.Component {

  render() {
    return (
      <div className="homeBar">
        <AuthUserContext.Consumer>
          {
            authUser => <Navigation authUser={authUser}/>
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

export default Navigation;
export { HomeBar };
