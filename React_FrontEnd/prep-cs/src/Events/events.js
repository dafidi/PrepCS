import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import BigCalendar from 'react-big-calendar';
// import globalize from 'globalize';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import moment from 'moment';

import { withAuthorization } from '../Session';

// const locale = moment.locale('en');
const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const events = [{
  'title': 'UPE Induction Ceremony',
  'bgColor': '#ff0050',
  'start': new Date(2019, 3, 4, 12, 0),
  'end': new Date(2019, 3, 4, 17, 0)
},
{
  'title': 'O(1) Memory Protection Lecture by Professor X',
  'bgColor': '#ff7f50',
  'start': new Date(2019, 4, 4, 12, 0),
  'end': new Date(2019, 4, 4, 17, 0)
}];

class EventsPageBase extends React.Component {
  constructor(props) {
    super(props);
  }

  prevClick = () => {

  }

  nextClick = () => {

  }

  onSelectDate = () => {

  }

  onViewChange = () => {

  }

  eventItemClick = () => {

  }

  render() {
    return (
      <div>
        <h2>Upcoming CS events @ HU</h2>
        <div style={{height:400}}>
          <BigCalendar
            events={events}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2019, 3, 1)}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
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

