import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization } from '../Session';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { ProblemListCard } from './problem-list-card';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import green_check from '../resources/images/white-check-icon-on-green.png';

class ProblemsComponentBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfProblems: [],
      problemListViews: null,
      problemTablePage: 0,
      uid: null,
      problemsUserHasSolved: []
    }
  }

  componentDidMount = () => {
    this.props.firebase.fs_problems()
      .get()
      .then(
        (snapshot) => {
          snapshot.forEach(
            (doc) => {
              this.state.listOfProblems.push({ "id": doc.id, "data": doc.data() });
            });
        }
      )
      .then((snapshot) => {
        // I'm only putting this here because there is a good chance the 
        // firebase prop will have been fully populated when this code runs
        this.setState({ uid: this.props.firebase.getUid() });

        this.props.firebase.fs_user(this.state.uid)
        .get()
        .then((doc) => {
          const userData = doc.data();
          this.setState({ problemsUserHasSolved: userData.problems_attempted_successfully });
        })
        .catch();
        
      })
      .catch();
  }

  handleChangePage = (event, page) => {
    this.setState({ problemTablePage: page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ problemTablePage: 0, rowsPerPage: event.target.value });
  };

  render() {
    const rowsPerPage = 5;

    return (
      <AuthUserContext.Consumer>
        {authUser =>
          <div>
            <h2>Pick a problem and hack away!</h2>
            <Paper >
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>Problem</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">{/** Column for status. */}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.state.listOfProblems.slice(this.state.problemTablePage * rowsPerPage, this.state.problemTablePage * rowsPerPage + rowsPerPage).map(problem => (
                      <TableRow key={problem["id"]}>
                        <TableCell component="th" scope="row">
                          <NavLink to={ROUTES.PROBLEM_DETAIL + '/' + problem["id"]}
                            style={{ color: 'black', textDecoration: 'none' }}>
                            <ProblemListCard problemName={problem["data"].shortName}
                              problemSummary={problem["data"].summary}
                              problemCategory={problem["data"].category}>
                            </ProblemListCard>
                          </NavLink>
                        </TableCell>
                        <TableCell align="right">
                          {problem["data"].summary}
                        </TableCell>
                        <TableCell>
                          { this.state.problemsUserHasSolved.includes(problem["id"]) && <img src={green_check} width="42" height="42" /> }
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={3}
                      count={this.state.listOfProblems.length}
                      rowsPerPage={rowsPerPage}
                      page={this.state.problemTablePage}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                    // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    // ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </div>}
      </AuthUserContext.Consumer>
    )
  }
}

const ProblemsComponent = compose(
  withRouter,
  withFirebase
)(ProblemsComponentBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProblemsComponent);
