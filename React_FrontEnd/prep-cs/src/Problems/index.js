import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';

import { NavLink } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

class ProblemsComponentBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfProblems: [],
      problemListViews: null,
      problemTablePage: 0,
      uid: null,
      problemsUserHasSolved: [],
      problemsByCategory: {},
      categories: [],
      width: "1920",
      height: "1080"
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount = () => {

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    let problemsByCategory = {};
    this.props.firebase.fs_problems()
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().category) {
            if (problemsByCategory[doc.data().category]) {
              problemsByCategory[doc.data().category].push(
                { "id": doc.id, "data": doc.data() }
              );
            } else {
              problemsByCategory[doc.data().category] = [{
                "id": doc.id,
                "data": doc.data()
              }];
            }

          } else {
            console.log(doc.data());
            problemsByCategory["Miscellaneous"].push(
              { "id": doc.id, "data": doc.data() }
            );
          }
        });
        this.setState({ problemsByCategory: problemsByCategory });
        this.setState({ categories: Object.keys(problemsByCategory) });
      })
      .catch((error) => { console.warn(error); });

    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: this.props.firebase.getUid() });

        this.props.firebase.fs_user(this.state.uid)
          .get()
          .then((doc) => {
            const userData = doc.data();
            if (userData.problems_attempted_successfully) {
              this.setState({ problemsUserHasSolved: userData.problems_attempted_successfully });
            }
          })
          .catch((error) => {
            // Uncaught errors can be problematic.
          });
      } else {

      }
    });

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleChangePage = (event, page) => {
    this.setState({ problemTablePage: page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ problemTablePage: 0, rowsPerPage: event.target.value });
  };

  render() {

    var Page_Height = this.state.height - 95;
    var Menu_Height = Page_Height / 9;

    Page_Height = "" + Page_Height + "px";
    Menu_Height = "" + Menu_Height + "px";

    /*======================================================================== */
    /*======================================================================== */
    /*======================================================================== */
    /*======================================================================== */

    var Presentation_Mode = true;

    /*======================================================================== */
    /*======================================================================== */
    /*======================================================================== */
    /*======================================================================== */

    const Button_Styling = ["btn btn-success btn-lg btn-block", "btn btn-info btn-lg btn-block", "btn btn-warning btn-lg btn-block", "btn btn-danger btn-lg btn-block"];
    const Color = ["#3498DB", "#20c997", "#18BC9C", "#F39C12", "#fd7e14", "#E74C3C", "#e83e8c", "#6f42c1", "#6610f2"];
    const categories = ["Arrays and Strings", "Search and Sort", "Stacks and Queues", "Linked Lists", "Trees and Graphs", "Recursion and Dynamic Programming", "Mathematics & Probability", "Bit Manipulation", "Miscellaneous"];

    if (Presentation_Mode == true){
      return (
        <div style={{overflowY: "hidden"}}>
          <AuthUserContext.Consumer>
            {
              authUser => authUser ?
                <div>
                  {
                    categories.map((category, i) => (
                      
                        <NavLink style={{color: "white", textDecoration: "none"}} key={category} to={ROUTES.COURSE + "/" + category}>
                        <button className={Button_Styling[i % 4]} style={{ height: Menu_Height, marginTop: "0px", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}} type="button">
                          <h3 key={category}>{i + 1 + ". "}{categories[i]}</h3>
                        </button>
                        </NavLink>
                      
                    )
                    )
                  }
                </div> : <div></div>
            }
          </AuthUserContext.Consumer>
        </div>
      )

    }
    else{

      return (
        <div style={{overflowY: "hidden"}}>
          <AuthUserContext.Consumer>
            {
              authUser => authUser ?
                <div>
                  {
                    this.state.categories.slice().map((category, i) => (
                      
                        <NavLink style={{color: "white", textDecoration: "none"}} key={category} to={ROUTES.COURSE + "/" + category}>
                        <button className={Button_Styling[i % 4]} style={{ height: Menu_Height, marginTop: "0px", boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"}} type="button">
                          <h3 key={category}>{i + 1 + ". "}{category}</h3>
                        </button>
                        </NavLink>
                      
                    )
                    )
                  }
                </div> : <div></div>
            }
          </AuthUserContext.Consumer>
        </div>
      )

          }
      
  }
}

const ProblemsComponent = compose(
  withRouter,
  withFirebase
)(ProblemsComponentBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProblemsComponent);
