import React, { Component } from "react";
import Navleft from "../Layout/Navleft";
import Navhaut from "../Layout/Navhaut";
import Chatbox from "../Layout/Chatbox";
import Calendar from "../Layout/Calendar";
import Footer from "../Layout/Footer";

export class Calendaruser extends Component {
  render() {
    return (
      <>
        <div class="wrapper">
          <Navhaut></Navhaut>
          <Calendar></Calendar>
        </div>
        <Chatbox></Chatbox>
        <Footer></Footer>
      </>
    );
  }
}

export default Calendaruser;
