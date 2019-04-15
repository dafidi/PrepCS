import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

import {VictoryBar, VictoryChart, VictoryStack, VictoryPie} from 'victory';

class DashboardComponentBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props }
    this.state = { width: '1920' };
    this.state = { width: '1080' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      userInfo: {
        uid: null
      },
      problemsUserHasAttempted: [],
      problemsUserHasAttemptedSuccessfully: [],
      numberOfProblemsUserHasAttempted: null,
      numberOfProblemsUserHasAttemptedSuccessfully: null,
      data:{
        totalNumberOfProblemsInArraysAndStrings: 1
      }
    };
  }

  componentDidMount() {

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({userInfo: {uid: this.props.firebase.getUid()} });
        this.props.firebase.fs_user(this.state.userInfo.uid)
        .get()
        .then((doc) => {
          let userData = doc.data();
          this.setState({
            problemsUserHasAttempted: userData.problems_attempted,
            problemsUserHasAttemptedSuccessfully: 
              userData.problems_attempted_successfully,
            numberOfProblemsUserHasAttempted:
              userData.problems_attempted.length,
            numberOfProblemsUserHasAttemptedSuccessfully:
             userData.problems_attempted_successfully.length
          });

        })
        .catch((error) => { console.warn(error); });
      } else {
        // Don't do anything, user info not available yet
      }
    });
    
    // this.props.firebase.fs_user()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    var Is_Mid_Desktop = this.state.width < 1300;
    var Is_Mobile_View = this.state.width < 700;
    var Page_Height = this.state.height - 95;
    Page_Height = "" + Page_Height + "px";
    var Total_Page_Width = this.state.width;
    var Page_Width = this.state.width - 190;
    var Card_Width = Page_Width - 47.5 - (Page_Width/2)
    var Triple_Section_Width = (Page_Width - 405)/3;
    var Triple_Section_Width_Mobile = (Total_Page_Width)/3 - 34;
    var Triple_Section_Width_Mid_Desktop = Triple_Section_Width_Mobile - 69.32;
    Total_Page_Width = "" + Total_Page_Width + "px";
    Page_Width = "" + Page_Width + "px";
    Card_Width = "" + Card_Width + "px";
    Triple_Section_Width = "" + Triple_Section_Width + "px";
    Triple_Section_Width_Mobile = "" + Triple_Section_Width_Mobile + "px";
    Triple_Section_Width_Mid_Desktop = "" + Triple_Section_Width_Mid_Desktop + "px";

    if (Is_Mobile_View == true || Is_Mid_Desktop == true){
      return (
        <div>
          {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="last_problem_opened" style={Is_Mobile_View ? {marginTop: "45px", width: Total_Page_Width} : {margin: "90px auto", width: Page_Width}}>
        <div className="card text-white bg-primary mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
            <div className="card-header">
              <h4 style={{ textAlign: 'center' }}>Last Problem Attempted</h4>
            </div>
            <div className="card-body">
              <p style={{ textAlign: 'center' }}><h5> Looks like you last attempted the problem <span style={{color: "#F39C12", fontSize: "1.3rem"}}>"TwoSum"</span>. Would you like to go back to the problem?</h5><br></br>
              <button type="submit" className="btn btn-warning">
                Go to Problem
              </button>
              </p>
            </div>
          </div>
        </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="progress_bars" style={Is_Mobile_View ? {marginTop: "45px", width: Total_Page_Width} : {margin: "90px auto", width: Page_Width}}>
        <div className="card border-secondary mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
            <div className="card-header" style={{backgroundColor: "#e51937"}}>
              <h4 style={{ color: "white", textAlign: 'center' }}>Progress Bars</h4>
            </div>
            <div className="card-body">
            <p>
            <h5 className="text-primary"><strong>Total Problems Solved:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "10%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <div style={Is_Mobile_View ? {float: "left", width: Triple_Section_Width_Mobile, marginRight: "20px"} : {float: "left", width: Triple_Section_Width_Mid_Desktop, marginRight: "20px"}}>
            <h5 className="text-success"><strong>A & S:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-info"><strong>S & S:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-warning"><strong>S & Q:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>
            </div>

            <div style={Is_Mobile_View ? {float: "left", width: Triple_Section_Width_Mobile, marginRight: "20px"} : {float: "left", width: Triple_Section_Width_Mid_Desktop, marginRight: "20px"}}> 
            <h5 className="text-danger"><strong>LL:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-success"><strong>T & G:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-info"><strong>R & DP:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>
            </div>

            <div style={Is_Mobile_View ? {float: "left", width: Triple_Section_Width_Mobile, marginRight: "20px"} : {float: "left", width: Triple_Section_Width_Mid_Desktop, marginRight: "20px"}}>
            <h5 className="text-warning"><strong>M & P:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-danger"><strong>BM:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-success"><strong>Misc:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>
            </div>

            <div style={{clear: "both"}}>
            </div>

              </p>
            </div>
          </div>
        </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="events" style={Is_Mobile_View ? {marginTop: "45px", width: Total_Page_Width} : {margin: "90px auto", width: Page_Width}}>
            <div className="card border-success mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
              <div className="card-header" style={{backgroundColor: "#18BC9C"}}>
                <h4 style={{ color: "white", textAlign: 'center' }}>Your Events</h4>
              </div>
              <div className="card-body">
                <p style={{ textAlign: 'center' }}><h5 className="text-success"><strong>Here's a list of your events:</strong></h5><br></br>
                <div className="list-group">
                  <a href="/dashboard" style={{ color: "white", backgroundColor: "#3498DB" }} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Personalized Dashboard</h5>
                    </div>
                    <p className="mb-1">Analyzes your statistics to accelerate your preparation.</p>
                  </a>
                  <a href="/courses" style={{ color: "white", backgroundColor: "#F39C12" }} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Coding Interview Readiness</h5>
                    </div>
                    <p className="mb-1">Prepares you for Technical and Behavioral Interviews.</p>
                  </a>
                  <a href="/events" style={{ color: "white", backgroundColor: "#E74C3C" }} className="list-group-item list-group-item-action flex-column align-items-start active">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">CS-Related Event Tracking</h5>
                    </div>
                    <p className="mb-1">Always be in the know to further your career goals.</p>
                  </a>
                </div>

                <br></br>
                <button type="submit" className="btn btn-success">
                  Go to Calender
                </button>
                </p>
              </div>
            </div>
          </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        
          <div className="leaderboard" style={Is_Mobile_View ? {marginTop: "45px", width: Total_Page_Width} : {margin: "90px auto", width: Page_Width}}>
          <div className="card border-warning mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
              <div className="card-header" style={{backgroundColor: "#F39C12"}}>
                <h4 style={{ color: "white", textAlign: 'center' }}>PrepCS Leaderboard</h4>
              </div>
              <div className="card-body">
                <p style={{ textAlign: 'center' }}><h5 className="text-warning"><strong>Here's the current standings of the Leaderboard:</strong></h5><br></br>
                <div className="list-group">
                  <a href="/dashboard" style={{ color: "white", backgroundColor: "#3498DB" }} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Personalized Dashboard</h5>
                    </div>
                    <p className="mb-1">Analyzes your statistics to accelerate your preparation.</p>
                  </a>
                  <a href="/courses" style={{ color: "white", backgroundColor: "#F39C12" }} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Coding Interview Readiness</h5>
                    </div>
                    <p className="mb-1">Prepares you for Technical and Behavioral Interviews.</p>
                  </a>
                  <a href="/events" style={{ color: "white", backgroundColor: "#E74C3C" }} className="list-group-item list-group-item-action flex-column align-items-start active">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">CS-Related Event Tracking</h5>
                    </div>
                    <p className="mb-1">Always be in the know to further your career goals.</p>
                  </a>
                </div>

                <br></br>
                <button type="submit" className="btn btn-warning">
                  Go to Leaderboard
                </button>
                </p>
              </div>
            </div>
          </div>


        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="difficulty" style={Is_Mobile_View ? {marginTop: "45px", width: Total_Page_Width} : {margin: "90px auto", width: Page_Width}}>
            <div className="card border-danger mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
                <div className="card-header" style={{backgroundColor: "#E74C3C"}}>
                  <h4 style={{ color: "white", textAlign: 'center' }}>Difficulty Completion</h4>
                </div>
                <div className="card-body">
                  <p style={{ textAlign: 'center' }}><h5 className="text-danger"><strong>Your Proficiency vs Difficulty:</strong></h5><br></br>

        <VictoryStack
        labels={["A & S", "S & S", "S & Q", "LL", "T & G", "R & DP", "M & P", "BM", "Misc"]}
          colorScale={["#18BC9C", "#F39C12", "#E74C3C"]}
        >
          <VictoryBar
            data={[{x: "Arrays & Strings", y: 5}, {x: "Search & Sort", y: 3}, {x: "Stacks & Queues", y: 2}, {x: "Linked Lists", y: 5}, {x: "Trees & Graphs", y: 3}, {x: "Recursion and Dynamic Programming", y: 2}, {x: "Mathematics & Probability", y: 5}, {x: "Bit Manipulation", y: 3}, {x: "Miscellaneous", y: 2}]}
          />
          <VictoryBar
            data={[{x: "Arrays & Strings", y: 5}, {x: "Search & Sort", y: 4}, {x: "Stacks & Queues", y: 1}, {x: "Linked Lists", y: 5}, {x: "Trees & Graphs", y: 4}, {x: "Recursion and Dynamic Programming", y: 1}, {x: "Mathematics & Probability", y: 5}, {x: "Bit Manipulation", y: 4}, {x: "Miscellaneous", y: 1}]}
          />
          <VictoryBar
            data={[{x: "Arrays & Strings", y: 6}, {x: "Search & Sort", y: 2}, {x: "Stacks & Queues", y: 3}, {x: "Linked Lists", y: 6}, {x: "Trees & Graphs", y: 2}, {x: "Recursion and Dynamic Programming", y: 3}, {x: "Mathematics & Probability", y: 6}, {x: "Bit Manipulation", y: 2}, {x: "Miscellaneous", y: 3}]}
          />
        </VictoryStack>

                  </p>
                </div>
              </div>
        </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="placeholder" style={Is_Mobile_View ? {marginTop: "45px", width: Total_Page_Width} : {margin: "90px auto", width: Page_Width}}>
          <div className="card border-info mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
                <div className="card-header" style={{backgroundColor: "#3498DB"}}>
                  <h4 style={{ color: "white", textAlign: 'center' }}>Placeholder</h4>
                </div>
                <div className="card-body">
                  <p style={{ textAlign: 'center' }}><h5 className="text-info"><strong>Graph Placeholder:</strong></h5><br></br>
                  
        <VictoryChart domainPadding={40}>
        <VictoryBar
          style={{ data: { fill: (datum) => datum.fill } }}
          data={[
            { x: "A", y: 2000, fill: "#3498DB" },
            { x: "B", y: 3000, fill: "#E74C3C" },
            { x: "C", y: 2500, fill: "#18BC9C" },
            { x: "D", y: 4000, fill: "#F39C12" }
          ]}
        />
      </VictoryChart>

                  </p>
                </div>
              </div>
          </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="strengths" style={Is_Mobile_View ? {marginTop: "45px", width: Total_Page_Width} : {margin: "90px auto", width: Page_Width}}>
        <div className="card border-success mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
                <div className="card-header" style={{backgroundColor: "#18BC9C"}}>
                  <h4 style={{ color: "white", textAlign: 'center' }}>Your Strengths</h4>
                </div>
                <div className="card-body">
                  <p style={{ textAlign: 'center' }}><h5 className="text-success"><strong>Analyzing your Strengths:</strong></h5>

      <VictoryPie
        colorScale={["#3498DB", "#E74C3C", "#18BC9C", "#F39C12"]}
        data={[
          { x: "A", y: 4000 },
          { x: "B", y: 2048 },
          { x: "C", y: 2600 },
          { x: "D", y: 1800 }
        ]}
      />
                  
                  </p>
                </div>
              </div>
        </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="weaknesses" style={Is_Mobile_View ? {marginTop: "45px", width: Total_Page_Width} : {margin: "90px auto", width: Page_Width}}>
        <div className="card border-warning mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
                <div className="card-header" style={{backgroundColor: "#F39C12"}}>
                  <h4 style={{ color: "white", textAlign: 'center' }}>Your Weaknesses</h4>
                </div>
                <div className="card-body">
                  <p style={{ margin: "0px 90px", textAlign: 'center' }}><h5 className="text-warning"><strong>Analyzing your Weaknesses:</strong></h5>
                  
      <VictoryPie
        colorScale={["#3498DB", "#E74C3C", "#18BC9C", "#F39C12"]}
        padAngle={3}
        innerRadius={100}
        data={[
          { x: "A", y: 4000 },
          { x: "B", y: 2048 },
          { x: "C", y: 2600 },
          { x: "D", y: 1800 }
        ]}
      />
                  </p>
                </div>
              </div>
        </div>
        
        
        {/*
        <h2>This is your dashboard.</h2>
        <h2>You've attempted {this.state.numberOfProblemsUserHasAttempted} problem{this.state.numberOfProblemsUserHasAttempted === 1 ? "" :"s" }.</h2>
        {
          
          this.state.numberOfProblemsUserHasAttempted === this.state.numberOfProblemsUserHasAttemptedSuccessfully
          ? <h2>You've completed all {this.state.numberOfProblemsUserHasAttempted} problems</h2>
          : <h2>You've completed {this.state.numberOfProblemsUserHasAttemptedSuccessfully} of them</h2>
        }
      */}
        </div>
      )
    }

    return (
      <div>
        
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="last_problem_opened" style={{margin: "90px auto", width: Page_Width}}>
        <div className="card text-white bg-primary mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
            <div className="card-header">
              <h4 style={{ textAlign: 'center' }}>Last Problem Attempted</h4>
            </div>
            <div className="card-body">
              <p style={{ margin: "0px 90px", textAlign: 'center' }}><h5> Looks like you last attempted the problem <span style={{color: "#F39C12", fontSize: "1.3rem"}}>"TwoSum"</span>. Would you like to go back to the problem?</h5><br></br>
              <button type="submit" className="btn btn-warning">
                Go to Problem
              </button>
              </p>
            </div>
          </div>
        </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="progress_bars" style={{margin: "90px auto", width: Page_Width}}>
        <div className="card border-secondary mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
            <div className="card-header" style={{backgroundColor: "#e51937"}}>
              <h4 style={{ color: "white", textAlign: 'center' }}>Progress Bars</h4>
            </div>
            <div className="card-body">
            <p style={{margin: "0px 90px"}}>
            <h5 className="text-primary"><strong>Total Problems Solved:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "10%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <div style={{float: "left", width: Triple_Section_Width, marginRight: "90px"}}>
            <h5 className="text-success"><strong>Arrays & Strings:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-info"><strong>Search & Sort:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-warning"><strong>Stacks & Queues:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>
            </div>

            <div style={{float: "left", width: Triple_Section_Width, marginRight: "90px"}}> 
            <h5 className="text-danger"><strong>Linked Lists:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-success"><strong>Trees & Graphs:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-info"><strong>Recursion & Dynamic Programming:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>
            </div>

            <div style={{float: "left", width: Triple_Section_Width}}>
            <h5 className="text-warning"><strong>Mathematics & Probability:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{width: "75%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-danger"><strong>Bit Manipulation:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{width: "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>

            <h5 className="text-success"><strong>Miscellaneous:</strong></h5>
            <div className="progress">
              <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <br></br>
            </div>

            <div style={{clear: "both"}}>
            </div>

              </p>
            </div>
          </div>
        </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        
        <div className="events_and_leaderboard" style={{margin: "90px auto", width: Page_Width}}>
          <span className="events" style={{width: Card_Width, float: "left"}}>
            <div className="card border-success mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
              <div className="card-header" style={{backgroundColor: "#18BC9C"}}>
                <h4 style={{ color: "white", textAlign: 'center' }}>Your Events</h4>
              </div>
              <div className="card-body">
                <p style={{ margin: "0px 90px", textAlign: 'center' }}><h5 className="text-success"><strong>Here's a list of your events:</strong></h5><br></br>
                <div className="list-group">
                  <a href="/dashboard" style={{ color: "white", backgroundColor: "#3498DB" }} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Personalized Dashboard</h5>
                    </div>
                    <p className="mb-1">Analyzes your statistics to accelerate your preparation.</p>
                  </a>
                  <a href="/courses" style={{ color: "white", backgroundColor: "#F39C12" }} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Coding Interview Readiness</h5>
                    </div>
                    <p className="mb-1">Prepares you for Technical and Behavioral Interviews.</p>
                  </a>
                  <a href="/events" style={{ color: "white", backgroundColor: "#E74C3C" }} className="list-group-item list-group-item-action flex-column align-items-start active">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">CS-Related Event Tracking</h5>
                    </div>
                    <p className="mb-1">Always be in the know to further your career goals.</p>
                  </a>
                </div>

                <br></br>
                <button type="submit" className="btn btn-success">
                  Go to Calender
                </button>
                </p>
              </div>
            </div>
          </span>
          <span className="leaderboard" style={{width: Card_Width, float: "right"}}>
          <div className="card border-warning mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
              <div className="card-header" style={{backgroundColor: "#F39C12"}}>
                <h4 style={{ color: "white", textAlign: 'center' }}>PrepCS Leaderboard</h4>
              </div>
              <div className="card-body">
                <p style={{ margin: "0px 90px", textAlign: 'center' }}><h5 className="text-warning"><strong>Here's the current standings of the Leaderboard:</strong></h5><br></br>
                <div className="list-group">
                  <a href="/dashboard" style={{ color: "white", backgroundColor: "#3498DB" }} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Personalized Dashboard</h5>
                    </div>
                    <p className="mb-1">Analyzes your statistics to accelerate your preparation.</p>
                  </a>
                  <a href="/courses" style={{ color: "white", backgroundColor: "#F39C12" }} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Coding Interview Readiness</h5>
                    </div>
                    <p className="mb-1">Prepares you for Technical and Behavioral Interviews.</p>
                  </a>
                  <a href="/events" style={{ color: "white", backgroundColor: "#E74C3C" }} className="list-group-item list-group-item-action flex-column align-items-start active">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">CS-Related Event Tracking</h5>
                    </div>
                    <p className="mb-1">Always be in the know to further your career goals.</p>
                  </a>
                </div>

                <br></br>
                <button type="submit" className="btn btn-warning">
                  Go to Leaderboard
                </button>
                </p>
              </div>
            </div>
          </span>
          <div style={{clear: "both"}}>
          </div>
        </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="difficulty_and_placeholder" style={{margin: "90px auto", width: Page_Width}}>
          <span className="difficulty" style={{width: Card_Width, float: "left"}}>
            <div className="card border-danger mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
                <div className="card-header" style={{backgroundColor: "#E74C3C"}}>
                  <h4 style={{ color: "white", textAlign: 'center' }}>Difficulty Completion</h4>
                </div>
                <div className="card-body">
                  <p style={{ margin: "0px 90px", textAlign: 'center' }}><h5 className="text-danger"><strong>Your Proficiency vs Difficulty:</strong></h5><br></br>

        <VictoryStack
        labels={["A & S", "S & S", "S & Q", "LL", "T & G", "R & DP", "M & P", "BM", "Misc"]}
          colorScale={["#18BC9C", "#F39C12", "#E74C3C"]}
        >
          <VictoryBar
            data={[{x: "Arrays & Strings", y: 5}, {x: "Search & Sort", y: 3}, {x: "Stacks & Queues", y: 2}, {x: "Linked Lists", y: 5}, {x: "Trees & Graphs", y: 3}, {x: "Recursion and Dynamic Programming", y: 2}, {x: "Mathematics & Probability", y: 5}, {x: "Bit Manipulation", y: 3}, {x: "Miscellaneous", y: 2}]}
          />
          <VictoryBar
            data={[{x: "Arrays & Strings", y: 5}, {x: "Search & Sort", y: 4}, {x: "Stacks & Queues", y: 1}, {x: "Linked Lists", y: 5}, {x: "Trees & Graphs", y: 4}, {x: "Recursion and Dynamic Programming", y: 1}, {x: "Mathematics & Probability", y: 5}, {x: "Bit Manipulation", y: 4}, {x: "Miscellaneous", y: 1}]}
          />
          <VictoryBar
            data={[{x: "Arrays & Strings", y: 6}, {x: "Search & Sort", y: 2}, {x: "Stacks & Queues", y: 3}, {x: "Linked Lists", y: 6}, {x: "Trees & Graphs", y: 2}, {x: "Recursion and Dynamic Programming", y: 3}, {x: "Mathematics & Probability", y: 6}, {x: "Bit Manipulation", y: 2}, {x: "Miscellaneous", y: 3}]}
          />
        </VictoryStack>

                  </p>
                </div>
              </div>
          </span>
          <span className="placeholder" style={{width: Card_Width, float: "right"}}>
          <div className="card border-info mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
                <div className="card-header" style={{backgroundColor: "#3498DB"}}>
                  <h4 style={{ color: "white", textAlign: 'center' }}>Placeholder</h4>
                </div>
                <div className="card-body">
                  <p style={{ margin: "0px 90px", textAlign: 'center' }}><h5 className="text-info"><strong>Graph Placeholder:</strong></h5><br></br>
                  
        <VictoryChart domainPadding={40}>
        <VictoryBar
          style={{ data: { fill: (datum) => datum.fill } }}
          data={[
            { x: "A", y: 2000, fill: "#3498DB" },
            { x: "B", y: 3000, fill: "#E74C3C" },
            { x: "C", y: 2500, fill: "#18BC9C" },
            { x: "D", y: 4000, fill: "#F39C12" }
          ]}
        />
      </VictoryChart>

                  </p>
                </div>
              </div>
          </span>
          <div style={{clear: "both"}}>
          </div>
        </div>

        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}
        {/*======================================================================== */}

        <div className="strengths_and_weaknesses" style={{margin: "90px auto", width: Page_Width}}>
        <span className="strengths" style={{width: Card_Width, float: "left"}}>
        <div className="card border-success mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
                <div className="card-header" style={{backgroundColor: "#18BC9C"}}>
                  <h4 style={{ color: "white", textAlign: 'center' }}>Your Strengths</h4>
                </div>
                <div className="card-body">
                  <p style={{ margin: "0px 90px", textAlign: 'center' }}><h5 className="text-success"><strong>Analyzing your Strengths:</strong></h5>

      <VictoryPie
        colorScale={["#3498DB", "#E74C3C", "#18BC9C", "#F39C12"]}
        data={[
          { x: "A", y: 4000 },
          { x: "B", y: 2048 },
          { x: "C", y: 2600 },
          { x: "D", y: 1800 }
        ]}
      />
                  
                  </p>
                </div>
              </div>
        </span>
        <span className="weaknesses" style={{width: Card_Width, float: "right"}}>
        <div className="card border-warning mb-3" style={{ boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}}>
                <div className="card-header" style={{backgroundColor: "#F39C12"}}>
                  <h4 style={{ color: "white", textAlign: 'center' }}>Your Weaknesses</h4>
                </div>
                <div className="card-body">
                  <p style={{ margin: "0px 90px", textAlign: 'center' }}><h5 className="text-warning"><strong>Analyzing your Weaknesses:</strong></h5>
                  
      <VictoryPie
        colorScale={["#3498DB", "#E74C3C", "#18BC9C", "#F39C12"]}
        padAngle={3}
        innerRadius={100}
        data={[
          { x: "A", y: 4000 },
          { x: "B", y: 2048 },
          { x: "C", y: 2600 },
          { x: "D", y: 1800 }
        ]}
      />
                  </p>
                </div>
              </div>
        </span>
        <div style={{clear: "both"}}>
        </div>
        </div>
        
        
        {/*
        <h2>This is your dashboard.</h2>
        <h2>You've attempted {this.state.numberOfProblemsUserHasAttempted} problem{this.state.numberOfProblemsUserHasAttempted === 1 ? "" :"s" }.</h2>
        {
          
          this.state.numberOfProblemsUserHasAttempted === this.state.numberOfProblemsUserHasAttemptedSuccessfully
          ? <h2>You've completed all {this.state.numberOfProblemsUserHasAttempted} problems</h2>
          : <h2>You've completed {this.state.numberOfProblemsUserHasAttemptedSuccessfully} of them</h2>
        }
      */}

      </div>
    )
  }
}

const DashboardComponent = compose(
  withRouter,
  withFirebase
)(DashboardComponentBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DashboardComponent);
