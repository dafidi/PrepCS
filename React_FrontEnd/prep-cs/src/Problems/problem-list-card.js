import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

class ProblemListCard extends React.Component {

  render() {
    return (
      <div style={{ width: "500px" }}>
        <Card style={{display:"flex"}}>
          <CardContent style={{width: "460px"}}>
            <Typography color="textSecondary" gutterBottom>
              {this.props.problemName}
            </Typography>
            <Typography variant="h5" component="h2">
              {this.props.problemName}
            </Typography>
            <Typography color="textSecondary">
              {this.props.problemCategory}
            </Typography>
            <Typography component="p">
              {this.props.problemSummary}
            </Typography>
          </CardContent>
          {
            this.props.userHasDone && <CardMedia
            // className={classes.cover}
            style={{height: "40px", width:"40px", float: "right"}}
            image={require("../resources/images/white-check-icon-on-green.png")}
            title="Done!"
          />}
        </Card>
      </div>
    );
  }
}

export { ProblemListCard };
