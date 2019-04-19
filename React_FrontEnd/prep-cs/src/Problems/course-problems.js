import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../constants/routes';

import Green_Check from '../resources/images/white-check-icon-on-green.png';

class CourseProblemsComponentBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      easyProblems: [],
      mediumProblems: [],
      hardProblems: [],
      width: "1920",
      height: "1080",
      problemsUserHasDone: []
    };
  }

  componentDidMount = () => {

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        const { course_id } = this.props.match.params;

        this.props.firebase.fs_problems().get()
          .then((snapshot) => {
            let easy = [];
            let medium = [];
            let hard = [];
            snapshot.forEach((doc) => {
              let problem = { id: doc.id, data: doc.data() };

              if (problem.data.category === course_id) {
                if (problem.data.difficulty === "easy") {
                  easy.push({ id: problem.id, data: problem.data });
                } else if (problem.data.difficulty === "medium") {
                  medium.push({ id: problem.id, data: problem.data });
                } else if (problem.data.difficulty === "hard") {
                  hard.push({ id: problem.id, data: problem.data });
                }
              } else {
                console.log(problem.data.shortName, "[" + problem.data.category + "]", course_id);
              }
            });
            this.setState({
              easyProblems: easy,
              mediumProblems: medium,
              hardProblems: hard,
            });

            console.log(this.state.easyProblems);
          })
          .catch((error) => { console.warn(error); });

        this.props.firebase.fs_user(this.props.firebase.getUid()).get()
        .then((doc) => {
          this.setState({
            problemsUserHasDone: doc.data().problems_attempted_successfully
          });
        })
        .catch((error) => {console.warn(error)});

      } else {

      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  render() {

    var Is_Mid_Desktop = this.state.width < 1300;
    var Is_Mobile_View = this.state.width < 700;

    var Page_Height = this.state.height - 96;
    var Page_Width = this.state.width;
    var Card_Carousel_Height = (Page_Height / 3);
    var Card_Height = (Page_Height * 3) / 5;
    var Card_Width = Page_Width / 2 - 10;
    var Card_Event_Width = Page_Width / 4;
    var Card_Event_Width_Mobile = Page_Width / 2;
    var Card_Event_Height = (Card_Carousel_Height * 2) / 3;

    var Pic_Height = Card_Event_Height - 53;
    var Pic_Width = Card_Event_Width - 1;
    var Pic_Width_Mobile = Card_Event_Width_Mobile - 1;


    Card_Carousel_Height = "" + Card_Carousel_Height + "px";
    Card_Height = "" + Card_Height + "px";
    Card_Width = "" + Card_Width + "px";

    Card_Event_Width = "" + Card_Event_Width + "px";
    Card_Event_Height = "" + Card_Event_Height + "px";
    Card_Event_Width_Mobile = "" + Card_Event_Width_Mobile + "px";

    Pic_Height = "" + Pic_Height + "px";
    Pic_Width = "" + Pic_Width + "px";
    Pic_Width_Mobile = "" + Pic_Width_Mobile + "px";

    /*======================================================================== */
    /*======================================================================== */
    /*======================================================================== */
    /*======================================================================== */

    var Presentation_Mode = false;

    /*======================================================================== */
    /*======================================================================== */
    /*======================================================================== */
    /*======================================================================== */

    const styles = ["card text-white bg-info mb-3", "card text-white bg-warning mb-3", "card text-white bg-success mb-3", "card text-white bg-danger mb-3", "card text-white bg-info mb-3", "card text-white bg-warning mb-3"];



    if (Presentation_Mode == true)
    {
      return (
        <AuthUserContext.Consumer>
          {
            authUser => authUser ?
              <div style={{overflowY: "hidden"}}>
                <div>
                <div>
                      <div className="Card_Carousel">
                        <div className="card border-secondary mb-3" style={Is_Mobile_View ? {boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", height: Card_Carousel_Height, marginBottom: "0px"} : { height: Card_Carousel_Height, marginBottom: "0px" }}>
                          <div className="card-header" style={{ backgroundColor: "#18BC9C" }}>
                            <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Easy Problems:</h4>
                          </div>
                          <div className="card-body" style={Is_Mobile_View ? { whiteSpace: "nowrap", overflowX: "scroll", padding: "0px", backgroundColor: "#003a63" } : { whiteSpace: "nowrap", overflowX: "scroll", backgroundColor: "#003a63" }}>
                  {
                    this.state.easyProblems.slice().map((problem, i) => (
                      
                      
  
                          <NavLink key={problem.id} to={ROUTES.PROBLEM_DETAIL + "/" + problem.id}>
                            <div className="card text-white bg-success mb-3" style={Is_Mobile_View ? { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width_Mobile, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" } : { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" }}>
                              <div className="card-header" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                                <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{i + 1 + ". "}{problem.data.shortName}</h4>
                              </div>
                              <div className="card-body" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                                <h5 style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                                {problem.data.summary}
                                </h5>
                                <div>
                                  {this.state.problemsUserHasDone.includes(problem.id) && <img style={Is_Mobile_View ? {height: "25px", width: "25px"} :{height: "50px", width: "50px"}}src={Green_Check}></img>}
                                </div> 
  
                              </div>
                            </div>
                          </NavLink>
                      
                          
  
  
                    ))
                  }
                  </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div>
                <div>
                     <div className="Card_Carousel">
                        <div className="card border-secondary mb-3" style={Is_Mobile_View ? {boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", height: Card_Carousel_Height, marginBottom: "0px"} : { height: Card_Carousel_Height, marginBottom: "0px" }}>
                          <div className="card-header" style={{ backgroundColor: "#F39C12" }}>
                            <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Medium Problems:</h4>
                          </div>
                          <div className="card-body" style={Is_Mobile_View ? { whiteSpace: "nowrap", overflowX: "scroll", padding: "0px", backgroundColor: "#003a63" } : { whiteSpace: "nowrap", overflowX: "scroll", backgroundColor: "#003a63" }}>
                  {
                    this.state.easyProblems.slice().map((problem, i) => (
                      
  
  
                      <NavLink key={problem.id} to={ROUTES.PROBLEM_DETAIL + "/" + problem.id}>
                      <div className="card text-white bg-warning mb-3" style={Is_Mobile_View ? { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width_Mobile, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" } : { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" }}>
                        <div className="card-header" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                          <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{i + 1 + ". "}{problem.data.shortName}</h4>
                        </div>
                        <div className="card-body" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                          <h5 style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                          {problem.data.summary}
                          </h5>
                          <div>
                                  {this.state.problemsUserHasDone.includes(problem.id) && <img style={Is_Mobile_View ? {height: "25px", width: "25px"} :{height: "50px", width: "50px"}}src={Green_Check}></img>}
                           </div> 
                        </div>
                      </div>
                    </NavLink>
  
  
                    ))
                  }
                  </div>
                        </div>
                      </div>            
                    </div>
                </div>
                <div>
                <div>
                      <div className="Card_Carousel">
                        <div className="card border-secondary mb-3" style={Is_Mobile_View ? {boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", height: Card_Carousel_Height, marginBottom: "0px"} : { height: Card_Carousel_Height, marginBottom: "0px" }}>
                          <div className="card-header" style={{ backgroundColor: "#E74C3C" }}>
                            <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Hard Problems:</h4>
                          </div>
                          <div className="card-body" style={Is_Mobile_View ? { whiteSpace: "nowrap", overflowX: "scroll", padding: "0px", backgroundColor: "#003a63" } : { whiteSpace: "nowrap", overflowX: "scroll", backgroundColor: "#003a63" }}>
                  {
                    this.state.easyProblems.slice().map((problem, i) => (
                      
  
                      <NavLink key={problem.id} to={ROUTES.PROBLEM_DETAIL + "/" + problem.id}>
                      <div className="card text-white bg-danger mb-3" style={Is_Mobile_View ? { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width_Mobile, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" } : { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" }}>
                        <div className="card-header" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                          <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{i + 1 + ". "}{problem.data.shortName}</h4>
                        </div>
                        <div className="card-body" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                          <h5 style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                          {problem.data.summary}
                          </h5>
                              <div>
                                  {this.state.problemsUserHasDone.includes(problem.id) && <img style={Is_Mobile_View ? {height: "25px", width: "25px"} : {height: "50px", width: "50px"}}src={Green_Check}></img>}
                              </div> 
                        </div>
                      </div>
                    </NavLink>
  
                          
                      ))
                  }
                </div>
                </div>
                        </div>
                      </div>
                      </div>
              </div> : <div></div>
          }
        </AuthUserContext.Consumer>
      )

    }
    return (
      <AuthUserContext.Consumer>
        {
          authUser => authUser ?
            <div style={{overflowY: "hidden"}}>
              <div>
              <div>
                    <div className="Card_Carousel">
                      <div className="card border-secondary mb-3" style={Is_Mobile_View ? {boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", height: Card_Carousel_Height, marginBottom: "0px"} : { height: Card_Carousel_Height, marginBottom: "0px" }}>
                        <div className="card-header" style={{ backgroundColor: "#18BC9C" }}>
                          <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Easy Problems:</h4>
                        </div>
                        <div className="card-body" style={Is_Mobile_View ? { whiteSpace: "nowrap", overflowX: "scroll", padding: "0px", backgroundColor: "#003a63" } : { whiteSpace: "nowrap", overflowX: "scroll", backgroundColor: "#003a63" }}>
                {
                  this.state.easyProblems.slice().map((problem, i) => (
                    
                    

                        <NavLink key={problem.id} to={ROUTES.PROBLEM_DETAIL + "/" + problem.id}>
                          <div className="card text-white bg-success mb-3" style={Is_Mobile_View ? { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width_Mobile, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" } : { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" }}>
                            <div className="card-header" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                              <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{i + 1 + ". "}{problem.data.shortName}</h4>
                            </div>
                            <div className="card-body" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                              <h5 style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                              {problem.data.summary}
                              </h5>
                              <div>
                                {this.state.problemsUserHasDone.includes(problem.id) && <img style={Is_Mobile_View ? {height: "25px", width: "25px"} :{height: "50px", width: "50px"}}src={Green_Check}></img>}
                              </div> 

                            </div>
                          </div>
                        </NavLink>
                    
                        


                  ))
                }
                </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div>
              <div>
                   <div className="Card_Carousel">
                      <div className="card border-secondary mb-3" style={Is_Mobile_View ? {boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", height: Card_Carousel_Height, marginBottom: "0px"} : { height: Card_Carousel_Height, marginBottom: "0px" }}>
                        <div className="card-header" style={{ backgroundColor: "#F39C12" }}>
                          <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Medium Problems:</h4>
                        </div>
                        <div className="card-body" style={Is_Mobile_View ? { whiteSpace: "nowrap", overflowX: "scroll", padding: "0px", backgroundColor: "#003a63" } : { whiteSpace: "nowrap", overflowX: "scroll", backgroundColor: "#003a63" }}>
                {
                  this.state.mediumProblems.slice().map((problem, i) => (
                    


                    <NavLink key={problem.id} to={ROUTES.PROBLEM_DETAIL + "/" + problem.id}>
                    <div className="card text-white bg-warning mb-3" style={Is_Mobile_View ? { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width_Mobile, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" } : { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" }}>
                      <div className="card-header" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                        <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{i + 1 + ". "}{problem.data.shortName}</h4>
                      </div>
                      <div className="card-body" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                        <h5 style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                        {problem.data.summary}
                        </h5>
                        <div>
                                {this.state.problemsUserHasDone.includes(problem.id) && <img style={Is_Mobile_View ? {height: "25px", width: "25px"} :{height: "50px", width: "50px"}}src={Green_Check}></img>}
                         </div> 
                      </div>
                    </div>
                  </NavLink>


                  ))
                }
                </div>
                      </div>
                    </div>            
                  </div>
              </div>
              <div>
              <div>
                    <div className="Card_Carousel">
                      <div className="card border-secondary mb-3" style={Is_Mobile_View ? {boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", height: Card_Carousel_Height, marginBottom: "0px"} : { height: Card_Carousel_Height, marginBottom: "0px" }}>
                        <div className="card-header" style={{ backgroundColor: "#E74C3C" }}>
                          <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Hard Problems:</h4>
                        </div>
                        <div className="card-body" style={Is_Mobile_View ? { whiteSpace: "nowrap", overflowX: "scroll", padding: "0px", backgroundColor: "#003a63" } : { whiteSpace: "nowrap", overflowX: "scroll", backgroundColor: "#003a63" }}>
                {
                  this.state.hardProblems.slice().map((problem, i) => (
                    

                    <NavLink key={problem.id} to={ROUTES.PROBLEM_DETAIL + "/" + problem.id}>
                    <div className="card text-white bg-danger mb-3" style={Is_Mobile_View ? { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width_Mobile, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" } : { boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", display: "inline-block", width: Card_Event_Width, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" }}>
                      <div className="card-header" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                        <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{i + 1 + ". "}{problem.data.shortName}</h4>
                      </div>
                      <div className="card-body" style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                        <h5 style={{ whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                        {problem.data.summary}
                        </h5>
                            <div>
                                {this.state.problemsUserHasDone.includes(problem.id) && <img style={Is_Mobile_View ? {height: "25px", width: "25px"} : {height: "50px", width: "50px"}}src={Green_Check}></img>}
                            </div> 
                      </div>
                    </div>
                  </NavLink>

                        
                    ))
                }
              </div>
              </div>
                      </div>
                    </div>
                    </div>
            </div> : <div></div>
        }
      </AuthUserContext.Consumer>
    )
  }
}

const CourseProblemsComponent = compose(
  withRouter,
  withFirebase
)(CourseProblemsComponentBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CourseProblemsComponent);
