import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

class ProblemsAPI {
  doStuff() {
    console.log("stuff");
    return "stuff";
  }

  getProblemsInCategories() {
    let problemsByCategory = { "Miscellaneous": [] };
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
            problemsByCategory["Miscellaneous"].push(
              { "id": doc.id, "data": doc.data() }
            );
          }
        });
        return problemsByCategory;
      })
      .catch((error) => { console.warn(error); });
  }
}

// const ProblemsAPI = compose(
//   withFirebase
// )(ProblemsAPIBase);

export default ProblemsAPI;
