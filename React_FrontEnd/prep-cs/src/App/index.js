import React from 'react';
import Demo_Problem from '../Problems/demo_problem';
import ProblemsComponent from '../Problems';
import DashboardComponent from '../Dashboard';
import HomeBar from '../Navigation';
import ProblemDetail from '../Problems/problem-detail';
import CourseProblemsComponent from '../Problems/course-problems';
import { SignInPage } from '../SignIn';
import { SignUpPage } from '../SignUp';
import { AuthUserContext, withAuthentication } from '../Session';
import { EventsPage } from '../Events';

import { withRouter } from 'react-router-dom';

import Logo from '../resources/images/Logo.png';

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
          <Route path="/course/:course_id" exact component={CourseProblemsComponent}></Route>
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
      showPlayButton: false,
      showGalleryPlayButton: false,
      showNav: false,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 4000,
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
        original: require('../resources/images/1.jpg')
      },
      {
        original: require('../resources/images/2.jpg')
      },
      {
        original: require('../resources/images/3.jpg')
      },
      {
        original: require('../resources/images/4.jpg')
      },
      {
        original: require('../resources/images/5.jpg')
      }
    ]

    var Is_Mobile_View = this.state.width < 700;

    var Page_Height = this.state.height - 95;
    var Page_Width = this.state.width - 180;

    var Div_Box_Width = Page_Width - 17;

    var testing_width = Page_Width - 180;
    var testing_width_mobile = Page_Width + 90 + 90;
    var testing_height = Page_Height - 180;
    var testing_height_mobile = Page_Height;
    testing_width = "" + testing_width + "px";
    testing_width_mobile = "" + testing_width_mobile + "px";
    testing_height = "" + testing_height + "px";
    testing_height_mobile = "" + testing_height_mobile + "px";

    Page_Height = "" + Page_Height + "px";
    Page_Width = "" + Page_Width + "px";
    Div_Box_Width = "" + Div_Box_Width + "px";

    if (Is_Mobile_View == true) {
      return (
        <div className="homeBody" style={{height: Page_Height, overflowY: "hidden"}}>
          <div style={{margin: "0px auto", height: Page_Height, position: "relative"}}>
          <div style={{boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", zIndex: "9001", position: "absolute", margin: "auto", width: testing_width_mobile, height: testing_height_mobile, backgroundColor: "rgb(0, 58, 99, 0.5)"}}>
          <div style={{textAlign: "center", top: "50%", left: "50%", transform: "translate(0%, 30%)"}}> 
            <img style={{height: "200px", top: "90px"}} src={Logo}></img>
            <h3 style={{ color: "white", textAlign: 'center', textShadow: "1px 1px 10px #000000"}}>PrepCS</h3>
            <h5 style={{ margin: "0px 45px", color: "white", textAlign: 'center', textShadow: "1px 1px 10px #000000"}}>PrepCS is web service aimed at providing Computer Science students at Howard University a personalized career development platform.</h5>
          </div>
          {!this.props.authUser &&
            <div style={{ margin: "150px auto", textAlign: "center" }} >
              <button type="button" onClick={this.goToSignInPage} className="btn btn-warning" style={{ paddingLeft: "30px", paddingRight: "30px", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" }}>Sign In</button>
              <button type="button" onClick={this.goToSignUpPage} className="btn btn-warning" style={{ marginLeft: "30px", paddingLeft: "30px", paddingRight: "30px", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" }}>Sign Up</button>
            </div>}
          </div>
            {/* run: npm rebuild node-sass; run: yarn start; that should apply styling */}
            <ImageGallery items={images} showNav={this.state.showNav} showGalleryPlayButton={this.state.showGalleryPlayButton} showPlayButton={this.state.showPlayButton} showThumbnails={this.state.showThumbnails} slideInterval={this.state.slideInterval} showBullets={this.state.showBullets} showFullscreenButton={this.state.showFullscreenButton} autoPlay={this.state.autoPlay}/>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="homeBody" style={{height: Page_Height, overflowY: "hidden"}}>
          <div style={{margin: "0px 90px", height: Page_Height, position: "relative"}}>
            {/* run: npm rebuild node-sass; run: yarn start; that should apply styling */}
            <div style={{boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", zIndex: "9001", position: "absolute", margin: "auto", width: Div_Box_Width, height: Page_Height, backgroundColor: "rgb(0, 58, 99, 0.5)"}}>
            <div style={{textAlign: "center", top: "50%", left: "50%", transform: "translate(0%, 30%)"}}> 
            <img style={{height: "300px", top: "90px"}} src={Logo}></img>
            <h1 style={{ color: "white", textAlign: 'center', textShadow: "1px 1px 10px #000000"}}>PrepCS</h1>
            <h4 style={{ margin: "0px 90px", color: "white", textAlign: 'center', textShadow: "1px 1px 10px #000000"}}>PrepCS is web service aimed at providing Computer Science students at Howard University a personalized career development platform.</h4>
            </div>
            {!this.props.authUser &&
            <div style={{ margin: "190px auto", textAlign: "center"}} >
              <button type="button" onClick={this.goToSignInPage} className="btn btn-warning" style={{ paddingLeft: "30px", paddingRight: "30px", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" }}>Sign In</button>
              <button type="button" onClick={this.goToSignUpPage} className="btn btn-warning" style={{ marginLeft: "60px", paddingLeft: "30px", paddingRight: "30px", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)" }}>Sign Up</button>
          </div>}
            </div>
            <ImageGallery items={images} showNav={this.state.showNav} showGalleryPlayButton={this.state.showGalleryPlayButton} showPlayButton={this.state.showPlayButton} showThumbnails={this.state.showThumbnails} slideInterval={this.state.slideInterval} showBullets={this.state.showBullets} showFullscreenButton={this.state.showFullscreenButton} autoPlay={this.state.autoPlay}/>
          </div>
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