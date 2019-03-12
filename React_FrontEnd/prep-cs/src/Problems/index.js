import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';

// class ProblemsComponent extends React.Component {
//   render() {
//     return (
//       <div><h3>Problems Page. List of Problems is shown here.</h3></div>
//     )
//   }
// }

const ProblemsComponent = () => (
  <AuthUserContext.Consumer> 
    {authUser => <div><h3>Problems Page. List of Problems is shown here.</h3></div>}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ProblemsComponent);
