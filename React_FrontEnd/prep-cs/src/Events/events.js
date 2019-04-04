import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

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
        this.setState({events: listOfEvents});
      })
      .catch((error) => { console.warn(error) });
  }

  render() {
    return (
      <div>
        <h2>Upcoming CS events @ HU</h2>
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

