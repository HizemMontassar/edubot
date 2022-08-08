import React, { Component } from 'react'

import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import bootstrapPlugin from '@fullcalendar/bootstrap';

import $ from 'jquery';
import Axios from "axios";
import jwt_decode from "jwt-decode";
  
export class Calendar extends Component {

    

    render() {  
      const style1 = {
        background: "#0062CC",
    };
      const style2 = {
        background: "#AC3391",
    };
      const style3 = {
        background: "#616C00",
    };
      const style4 = {
        background: "#007A38",
    };

        
    
        return (<> 
        
                
              <div class="content-wrapper">
                <div class="container-full">

                  <section class="content">
                  <div class="row m-0 justify-content-center">
                    <div class="col-2 p-3 mb-2 text-white" style={style1}>Workshop</div>
                    <div class="col-2 p-3 mb-2 text-white" style={style3}>Course</div>
                    <div class="col-2 p-3 mb-2 text-white" style={style2}>Exam</div>
                    <div class="col-2 p-3 mb-2 text-white" style={style4}>Calendar</div>
                  </div>
                    <div id="calendar">
                    <FullCalendar
                    themeSystem= 'bootstrap'
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin, bootstrapPlugin ]}
                    googleCalendarApiKey= "AIzaSyBUlajb6GaPiOTRfWym3PLDATZSaboaHHI"
                    events= {{  
                      googleCalendarId: "paspoli98@gmail.com"
                    }}
                    eventClick= {testtestestest}
                    headerToolbar={{
                      left: 'prev, next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    initialEvents={getEvents}
                    initialView= 'dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={function(arg) {
                      window.$("#myModal").modal("show");
                      window.$("#myButtonTest").attr("startingDate",arg.startStr);
                      window.$("#myButtonTest").attr("endingDate",arg.endStr);
                    }}
                    eventContent={renderEventContent} 
                    eventClick={this.handleEventClick}
                />
                    </div>
                  </section>

                </div>
              </div>
          <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
              
                <div class="modal-header text-center">
                  <h4 class="modal-title align-center">Add Event</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body text-center">
                <form>
                    <div className="form-group">
                      <label htmlFor="eventType">Event Type</label>                      
                      <select class="browser-default custom-select" id="eventType" value={this.state.eventType} onChange={this.handleEventTypeChange}>
                          <option value="workshop" selected>workshop</option>
                          <option value="exam">exam</option>
                          <option value="course">course</option>
                          <option value="calendar">calendar</option>
                      </select>
                    </div> 
  
                    <div className="form-group">
                      <label htmlFor="eventName">Event Name</label>
                      <input className="form-control" id="eventName" placeholder="eventName" value={this.state.eventName} onChange={this.handleEventNameChange}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="eventDescription">Event Description</label>
                      <input className="form-control" id="eventDescription" placeholder="eventDescription" value={this.state.eventDescription} onChange={this.handleEventDescriptionChange}/>
                    </div>
                    <div className="form-group">
                      <button type="button" id="myButtonTest" className="form-control btn btn-primary" onClick={this.handeAddEvent}>
                      Add Event
                       </button>
                    </div>
                  </form>
                </div>
              
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
      
            </>

        )
        }

        state = {
          eventType: 'workshop',
          eventName: '',
          eventDescription: ''
       };
      

        handleEventTypeChange = (e) => {
          this.setState({eventType: e.target.value});
        }
        handleEventNameChange = (e) => {
          this.setState({eventName: e.target.value})
        }
        handleEventDescriptionChange = (e) => {
          this.setState({eventDescription: e.target.value})
        }

        handeAddEvent = (e) =>{
          e.preventDefault();
          console.log("eventType: "+ this.state.eventType);
          console.log("EventName: "+ this.state.eventName);
          console.log("eventDescription: "+ this.state.eventDescription);
          console.log("starting date: "+ document.getElementById('myButtonTest').getAttribute('startingDate'));
          console.log("ending date: "+ document.getElementById('myButtonTest').getAttribute('endingDate'));

          let eventType = this.state.eventType;
          let eventName = this.state.eventName;
          let eventDescription = this.state.eventDescription;
          let startingDate = document.getElementById('myButtonTest').getAttribute('startingDate');
          let endingDate = document.getElementById('myButtonTest').getAttribute('endingDate');

            var local=localStorage.getItem('Data');
            const decode=jwt_decode(local)
            var id_user=decode._id
            console.log("id user: "+id_user);

          Axios.post("/events/addUser/",{
                  idUser: id_user,
                  startingDate: startingDate,
                  endingDate: endingDate,
                  eventType: eventType,
                  eventName: eventName,
                  description: eventDescription

                }).then((response)=>{
                  window.$("#myModal").modal("hide");
                  $("#calendar").load(window.location.href);
                })
        }

        handleWeekendsToggle = () => {
            this.setState({
              weekendsVisible: !this.state.weekendsVisible
            })
          }
        
          handleDateSelect = (selectInfo) => {

            let eventType = this.state.eventType;
            let eventName = this.state.eventName;
            let eventDescription = this.state.eventDescription;
            console.log("eventType: "+ this.state.eventType);
            console.log("EventName: "+ eventName);
            console.log("eventDescription: "+ eventDescription);
            let calendarApi = selectInfo.view.calendar;
            console.log(selectInfo.startStr);
        
            calendarApi.unselect()
        
            if (eventType) {
  
  
                Axios.post("/events/addUser/",{
                  idUser: createEventId(),
                  startingDate: selectInfo.startStr,
                  endingDate: selectInfo.startStr,
                  eventType: eventType,
  
                }).then((response)=>{
                    if(eventType==="workshop"){
                      calendarApi.addEvent({
                        id: response.data.data._id,
                        eventType,
                        start: selectInfo.startStr,
                        end: selectInfo.endStr,
                        allDay: selectInfo.allDay,
                        color: "#0062CC"
                      })
                    }
                    if(eventType==="exam"){
                      calendarApi.addEvent({
                        id: response.data.data._id,
                        eventType,
                        start: selectInfo.startStr,
                        end: selectInfo.endStr,
                        allDay: selectInfo.allDay,
                        color: "pink"
                      })
                    }
                    if(eventType==="course"){
                      calendarApi.addEvent({
                        id: response.data.data._id,
                        eventType,
                        start: selectInfo.startStr,
                        end: selectInfo.endStr,
                        allDay: selectInfo.allDay,
                        color: "red"
                      })
                    }
                    if(eventType==="calendar"){
                      calendarApi.addEvent({
                        id: response.data.data._id,
                        eventType,
                        start: selectInfo.startStr,
                        end: selectInfo.endStr,
                        allDay: selectInfo.allDay,
                        color: "yellow"
                      })
                    }
                  console.log(response)
                })
  
  
                
  
  
            }
          }
        
          handleEventClick = (clickInfo) => {
  
            if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.id}'`)) {
              Axios.delete("/events/deleteEvent/"+clickInfo.event.id).then((response)=>{
                console.log("event deleted");
              })
              clickInfo.event.remove()
            }
          }
        
          handleEvents = () => {
            Axios.get("/events/displayEvents/")
            .then((result)=>{
              var INITIAL_EVENTS =[];
              for(var i=0; i<result.data.length; i++){
                var test = {
                  id: result.data[i]._id,
                  title: result.data[i].eventType,
                  start: result.data[i].startingDate,
                  end: result.data[i].endingDate
                }
                INITIAL_EVENTS.push(test);
                
              }
              console.log(INITIAL_EVENTS);
              console.log(result.data.length);
              return INITIAL_EVENTS;
  
            
      })
          }

          

}
let eventGuid = 191;

function createEventId() {
  return String(eventGuid++)
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}

function testtestestest(arg) {

  window.open(arg.event.url, '_blank', 'width=700,height=600');

  arg.jsEvent.preventDefault();
}

async function getEvents(){
  var aa=[];
      const test = await Axios.get("/events/displayEvents/")
          .then((result)=>{
            var INITIAL_EVENTS =[];
            for(var i=0; i<result.data.length; i++){
              if(result.data[i].eventType === "workshop"){
                var test = {
                  id: result.data[i]._id,
                  title: result.data[i].eventName,
                  start: result.data[i].startingDate,
                  end: result.data[i].endingDate,
                  description: result.data[i].description,
                  backgroundColor: "#0062CC",
                }
              }
              if(result.data[i].eventType === "exam"){
                var test = {
                  id: result.data[i]._id,
                  title: result.data[i].eventName,
                  start: result.data[i].startingDate,
                  end: result.data[i].endingDate,
                  description: result.data[i].description,
                  backgroundColor: "#AC3391"
                }
              }
              if(result.data[i].eventType === "course"){
                var test = {
                  id: result.data[i]._id,
                  title: result.data[i].eventName,
                  start: result.data[i].startingDate,
                  end: result.data[i].endingDate,
                  description: result.data[i].description,
                  backgroundColor: "#616C00"
                }
              }

              if(result.data[i].eventType === "calendar"){
                var test = {
                  id: result.data[i]._id,
                  title: result.data[i].eventName,
                  start: result.data[i].startingDate,
                  end: result.data[i].endingDate,
                  description: result.data[i].description,
                  backgroundColor: "#007A38"
                }
              }
              
              INITIAL_EVENTS.push(test);
              
            }
            console.log(INITIAL_EVENTS);
            aa=INITIAL_EVENTS;
            console.log(result.data.length);  
    })
    return aa;
}
    export default Calendar;