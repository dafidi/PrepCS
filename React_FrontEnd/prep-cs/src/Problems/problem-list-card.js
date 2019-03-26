import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class ProblemListCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardContent>
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
      </Card>
    );
  }
}

export { ProblemListCard };
