import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const events = [{
  'title': 'UPE Induction Ceremony',
  'bgColor': '#ff0050',
  'start': new Date(2019, 3, 4, 12, 0),
  'end': new Date(2019, 3, 4, 17, 0),
  'id': 'Id of UPR induction ceremony'
},
{
  'title': 'O(1) Memory Protection Lecture by Professor X',
  'id': 'mem-prot-X',
  'start': new Date(2019, 4, 4, 12, 0),
  'end': new Date(2019, 4, 4, 17, 0)
}];

class EventsPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      sortedEvents: []
    };
  }

  componentDidMount() {
    let listOfEvents = [];

    this.props.firebase.fs_events()
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const docData = doc.data();
          listOfEvents.push({
            title: docData.title,
            id: docData.id,
            start: new Date(docData.start.seconds * 1000),
            end: new Date(docData.end.seconds * 1000)
          });
        });
        this.setState({ events: listOfEvents });
      })
      .catch((error) => { console.warn(error) });
  }

  render() {
    return (
      <div style={{width:"75vw", marginLeft:20}}>
        <h2>Upcoming CS events @ HU</h2>
        <div style={{margin:10}}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Event Title</TableCell>
                  <TableCell>Event Start</TableCell>
                  <TableCell>Event End</TableCell>
                  <TableCell>Marked?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.events.map(
                    event => (
                      <TableRow key={event.id}>
                        <TableCell><span>{event.title}</span></TableCell>
                        <TableCell><span>{(new Date(event.start)).toString()}
                          </span>
                        </TableCell>
                        <TableCell><span>{(new Date(event.end)).toString()}
                          </span>
                        </TableCell>
                        <TableCell><span>No</span></TableCell>
                      </TableRow>
                    )
                  )
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
        <div style={{ height: 400 }}>
          <BigCalendar
            events={this.state.events}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2019, 3, 1)}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={(event) => { console.log(event.id + " has been clicked") }}
          />
        </div>
      </div>
    )
  }
}

const EventsPage = compose(
  withRouter,
  withFirebase
)(EventsPageBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(EventsPage);

