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

import { withRouter } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './index.css';

import 'brace/mode/python';
import 'brace/theme/solarized_dark';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

class HomePage extends React.Component {

  render() {
    return (
      <Router>
        <div className="homePage">
          <HomeBar authUser={this.props.authUser} />
          <div style={{paddingTop: "95px"}}>
          <Route path="/" exact render={(props) => <HomeBody {...props} authUser={this.props.authUser} />}></Route>
          <Route path="/home" exact render={(props) => <HomeBody {...props} authUser={this.props.authUser} />}></Route>
          <Route path="/signin" exact component={SignInPage}></Route>
          <Route path="/signup" exact component={SignUpPage}></Route>
          <Route path="/courses" exact component={ProblemsComponent}></Route>
          <Route path="/demo-problem" exact component={Demo_Problem}></Route>
          <Route path="/problem-detail/:problem_id" component={ProblemDetail}></Route>
          <Route path="/events" exact component={EventsPage}></Route>
          <Route path="/dashboard" exact component={DashboardComponent}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

class HomeBodyBase extends React.Component {
  constructor(props) {
    super(props);
    //this.state = { data: this.props }
    this.state = { width: '1920' };
    this.state = { height: '1080' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      autoPlay: true,
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: false,
      showFullscreenButton: false,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: false,
      thumbnailPosition: 'bottom',
      showVideo: {},
    };

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

  goToSignInPage = () => {
    this.props.history.push('/signin');
  }

  goToSignUpPage = () => {
    this.props.history.push('/signup');
  }

  render() {

    const images = [
      {
        original: require('../resources/images/1.jpg'),
        thumbnail: require('../resources/images/1.jpg')
      },
      {
        original: require('../resources/images/2.jpg'),
        thumbnail: require('../resources/images/2.jpg')
      },
      {
        original: require('../resources/images/3.jpg'),
        thumbnail: require('../resources/images/3.jpg')
      },
      {
        original: require('../resources/images/4.jpg'),
        thumbnail: require('../resources/images/4.jpg')
      },
      {
        original: require('../resources/images/5.jpg'),
        thumbnail: require('../resources/images/5.jpg')
      }
    ]

    var Is_Mobile_View = this.state.width < 700;

    var Page_Height = this.state.height - 95;
    Page_Height = "" + Page_Height + "px";

    if (Is_Mobile_View == true) {
      return (
        <div className="homeBody" style={{height: "100vh", width: "100vw"}}>
          <div style={{margin: "0px auto"}}>
            {/* run: npm rebuild node-sass; run: yarn start; that should apply styling */}
            <ImageGallery items={images} showThumbnails={this.state.showThumbnails} showBullets={this.state.showBullets} showFullscreenButton={this.state.showFullscreenButton} autoPlay={this.state.autoPlay}/>
          </div>
          {!this.props.authUser &&
            <div style={{ margin: "50px auto", textAlign: "center" }} >
              <button type="button" onClick={this.goToSignInPage} className="btn btn-warning" style={{ paddingLeft: "30px", paddingRight: "30px" }}>Sign In</button>
              <button type="button" onClick={this.goToSignUpPage} className="btn btn-warning" style={{ marginLeft: "60px", paddingLeft: "30px", paddingRight: "30px" }}>Sign Up</button>
            </div>}
        </div>
      );
    }
    else {
      return (
        /* NEED TO SOMEHOW CHANGE IMAGE STYLING IN THE GALLERY_ IMPORTANT */
        <div className="homeBody" style={{height: Page_Height}}>
          <div style={{margin: "0px 95px", height: Page_Height}}>
            {/* run: npm rebuild node-sass; run: yarn start; that should apply styling */}
            <ImageGallery items={images} showThumbnails={this.state.showThumbnails} showBullets={this.state.showBullets} showFullscreenButton={this.state.showFullscreenButton} autoPlay={this.state.autoPlay}/>
          </div>
          {/*!this.props.authUser &&
            <div style={{ margin: "50px auto", textAlign: "center" }} >
              <button type="button" onClick={this.goToSignInPage} className="btn btn-warning" style={{ paddingLeft: "30px", paddingRight: "30px" }}>Sign In</button>
              <button type="button" onClick={this.goToSignUpPage} className="btn btn-warning" style={{ marginLeft: "60px", paddingLeft: "30px", paddingRight: "30px" }}>Sign Up</button>
          </div>*/}
        </div>
      );
    }

  }
}

const HomeBody = withRouter(HomeBodyBase);

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