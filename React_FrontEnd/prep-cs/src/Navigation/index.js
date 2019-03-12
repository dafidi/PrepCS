import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { SignOutButton } from '../SignOut';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../constants/routes';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    </ul>
  </div>
);

class HomeBar extends React.Component {

  render() {
    return (
      <div className="homeBar">
        <AuthUserContext.Consumer>
          {authUser =>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="navbar-nav mr-auto">
              <span className="Nav_link">
                <NavLink to={ROUTES.LANDING}
                  style={{ color: 'black' }}>
                  PrepCS
						</NavLink>
              </span>
              <span className="Nav_link">
                <NavLink to={ROUTES.PROBLEMS}
                  style={{ color: 'black' }}
                  activeStyle={{ color: 'yellow' }}>
                  Problems
							</NavLink>
              </span>
              <span className="Nav_link" >
                <NavLink to={ROUTES.DEMO_PROBLEM}
                  style={{ color: 'black' }}
                  activeStyle={{ color: 'yellow' }}>
                  Demo Problem
						</NavLink>
              </span>
              <SignOutButton />
            </div>
          </nav>
          }
        </AuthUserContext.Consumer>
      </div>
    );
  }
}

export default Navigation;
export { HomeBar };
