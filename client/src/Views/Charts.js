import React, { Component } from "react";
import Navleft from "../Layout/Navleft";
import Navhaut from "../Layout/Navhaut";
import Charts from "../Layout/Charts";
import Chatbox from "../Layout/Chatbox";

import Profile from "../Layout/Profile";
import Footer from "../Layout/Footer";
import ListCourses from "../Layout/ListCourses";

export class Chart extends Component {
  render() {
    return (
      <>
        <div>
          <Navhaut></Navhaut>
          <Charts></Charts>
        </div>
      </>
    );
  }
}

export default Chart;
