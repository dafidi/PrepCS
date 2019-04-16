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
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class EventsPageBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      sortedEvents: [],
      width: '1920',
      height: '1080'
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this._isMounted = false;
  }

  componentDidMount() {

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this._isMounted = true;
    let listOfEvents = [];


    this._isMounted === true && this.props.firebase.fs_events()
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

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleEventStatusChange = (checkbox) => {
    if (checkbox.checked) {
      // console.log("wasn't going. is going now.");
    } else {
      // console.log("was going. isn't going anymore.");
    }
  }


  render() {

    var Is_Mid_Desktop = this.state.width < 1300;
    var Is_Mobile_View = this.state.width < 700;

    var Page_Height = this.state.height - 96;
    var Page_Width = this.state.width;
    var Card_Carousel_Height = (Page_Height * 2) / 5;
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

    const numberOfEvents = this.state.events.length;

    const styles = ["card text-white bg-info mb-3", "card text-white bg-warning mb-3", "card text-white bg-success mb-3", "card text-white bg-danger mb-3", "card text-white bg-info mb-3", "card text-white bg-warning mb-3"];
    const event_images = [require("../resources/images/e1.jpg"), require("../resources/images/e2.jpg"), require("../resources/images/e3.jpg"), require("../resources/images/e4.jpg"), require("../resources/images/e5.jpg"), require("../resources/images/e6.jpg")];
    return (
      <div style={{ overflow: "hidden" }}>
        {/*<h2>Upcoming CS Events @ Howard University</h2>*/}
        <div className="Card_Carousel">
          <div className="card border-secondary mb-3" style={Is_Mobile_View ? {boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", height: Card_Carousel_Height, marginBottom: "0px"} : { height: Card_Carousel_Height, marginBottom: "0px" }}>
            <div className="card-header" style={{ backgroundColor: "#e51937" }}>
              <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Upcoming Events @ Howard University:</h4>
            </div>
            <div className="card-body" style={Is_Mobile_View ? { whiteSpace: "nowrap", overflowX: "scroll", padding: "0px" } : { whiteSpace: "nowrap", overflowX: "scroll" }}>

              {
                this.state.events.map((event, i) => (
                    <div key={event.id} className={styles[i % numberOfEvents]} style={Is_Mobile_View ? { display: "inline-block", width: Card_Event_Width_Mobile, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" } : { display: "inline-block", width: Card_Event_Width, height: Card_Event_Height, marginBottom: "0px", marginRight: "20px" }}>
                      <div className="card-header" style={{ whiteSpace: "nowrap" , textOverflow: "ellipsis", textAlign: "center", overflow: "hidden"}}>
                        <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px", whiteSpace: "nowrap" ,textOverflow: "ellipsis", textAlign: "center", overflow: "hidden" }}>{event.title}</h4>
                      </div>
                      <div className="card-body" style={{padding: "0px"}}>
                        <img style={Is_Mobile_View ? {objectFit: "cover", height: Pic_Height, width: Pic_Width_Mobile} : {objectFit: "cover", objectPosition: "0 20%", height: Pic_Height, width: Pic_Width}} src={event_images[i]}></img>
                      </div>
                    </div>
                    ))
              }

            </div>
          </div>
        </div>
        <div className="Bottom" style={{ margin: "3px auto" }}>
          <div className="Event_List" style={Is_Mobile_View ? {boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)"} : { float: "left", width: Card_Width }}>
            <div className="card border-success mb-3" style={Is_Mobile_View ? {height: Card_Height, marginBottom: "0px" } :  {height: Card_Height, marginBottom: "0px" }}>
              <div className="card-header" style={{ backgroundColor: "#18BC9C" }}>
                <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Add List to Calender:</h4>
              </div>
              <div className="card-body" style={{overflowY: "scroll"}}>

                <div>
                  <Paper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Event Title</TableCell>
                          <TableCell>Event Start</TableCell>
                          <TableCell>Event End</TableCell>
                          <TableCell>Going?</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          this.state.events.map(
                            event => (
                              <TableRow key={event.id}>
                                <TableCell style={{padding: "5px"}}><span>{event.title}</span></TableCell>
                                <TableCell style={{padding: "5px"}}><span >{(new Date(event.start)).toString()}
                                </span>
                                </TableCell>
                                <TableCell style={{padding: "5px"}}><span>{(new Date(event.end)).toString()}
                                </span>
                                </TableCell>
                                <TableCell style={{padding: "5px"}}><span><input type="checkbox" onClick={this.handleEventStatusChange}></input></span></TableCell>
                              </TableRow>
                            )
                          )
                        }
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </div>
            </div>
          </div>
          <div className="Event_Calender" style={Is_Mobile_View ? {} : { float: "right", width: Card_Width }}>
            <div className="card border-warning mb-3" style={Is_Mobile_View ? {boxShadow: "0px 0px 10px 5px rgba(0,0,0,.3)", marginBottom: "0px"} : { height: Card_Height, marginBottom: "0px" }}>
              <div className="card-header" style={{ backgroundColor: "#F39C12" }}>
                <h4 style={{ color: "white", textAlign: 'center', marginBottom: "0px" }}>Calender:</h4>
              </div>
              <div className="card-body">

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
            </div>
          </div>

        </div>


        {/*<div style={{margin:10}}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Event Title</TableCell>
                  <TableCell>Event Start</TableCell>
                  <TableCell>Event End</TableCell>
                  <TableCell>Going?</TableCell>
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
                        <TableCell><span><input type="checkbox" onClick={this.handleEventStatusChange}></input></span></TableCell>
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
              </div>*/}
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

