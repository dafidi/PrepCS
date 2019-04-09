import React from 'react';
import { NavLink } from 'react-router-dom';
import { SignOutButton } from '../SignOut';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../constants/routes';

class Navigation extends React.Component {

constructor(props) {
    super(props);
    this.state = { data: this.props }
    this.state = { width: '1920' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
}

componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
}

componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
}

  render() {
    var Is_Mid_Desktop = this.state.width < 1100;
    var Is_Mobile_View = this.state.width < 450;
    if (Is_Mobile_View == true) {
      return (
        <div>
          <div className="navline"></div>
          <div className="navbar_edit">
        <div className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ minWidth: "350px" , height: "45px"}}>
          <div className="collapse navbar-collapse">
            <NavLink to={ROUTES.LANDING} className="nav-item active">
                <span className="navbar-brand">PrepCS</span>
            </NavLink>
          </div>
          <span>
              {this.props.userInfo && <span><span style={{marginRight: "10px", color: "white", display: "inline-block", marginTop: "10px"}}> Hi, {this.props.userInfo.username}! </span> <SignOutButton /> </span>}
          </span>
        </div>
        <div className="navbar navbar-expand-lg navbar-dark bg-secondary" style={{ minWidth: "350px" , height: "45px"}}>
          <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0" style={{fontSize: "1.171875rem"}}>
              <li className="nav-item">
                <NavLink to={ROUTES.DASHBOARD}
                  className="nav-link">
                  Dashboard
                  </NavLink>
              </li>
              <li className="nav-item" style={{ marginLeft: "11vw", marginRight: "11vw"}}>
                <NavLink to={ROUTES.COURSES}
                  className="nav-link">
                  Courses
                  </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={ROUTES.EVENTS}
                  className="nav-link">
                  Events
                  </NavLink>
              </li>
            </ul>
          </div>
        </div>
        </div>
        </div>
      );
    }
    else {
      return (
        <div>
        <div className="navline"></div>
        <div className="navbar_edit">
        <div className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ minWidth: "350px" , height: "90px"}}>
          <div className="collapse navbar-collapse">
            <NavLink to={ROUTES.LANDING} className="nav-item active">
                <span className="navbar-brand">PrepCS</span>
            </NavLink>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0" style={Is_Mid_Desktop ? {marginLeft: "19vw", fontSize: "1.171875rem"} : {marginLeft: "35vw", fontSize: "1.171875rem"}}>
              <li className="nav-item">
                <NavLink to={ROUTES.DASHBOARD}
                  className="nav-link">
                  Dashboard
                  </NavLink>
              </li>
              <li className="nav-item" style={Is_Mid_Desktop ? { marginLeft: "3vw", marginRight: "3vw"} : { marginLeft: "5vw", marginRight: "5vw"}}>
                <NavLink to={ROUTES.COURSES}
                  className="nav-link">
                  Courses
                  </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={ROUTES.EVENTS}
                  className="nav-link">
                  Events
                  </NavLink>
              </li>
            </ul>
          </div>
          <span>
              {this.props.userInfo && <span><span style={{ marginRight: "10px", color: "white", display: "inline-block", marginTop: "10px"}}> Hi, {this.props.userInfo.username}! </span> <SignOutButton /> </span>}
          </span>
        </div>
        </div>
        </div>
      );

    }
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
