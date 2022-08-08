import React, { Component } from "react";
import Navleft from "../Layout/Navleft";
import Navhaut from "../Layout/Navhaut";

import Chatbox from "../Layout/Chatbox";

import Char from "../Layout/Chartcourse";
import Footer from "../Layout/Footer";

export class Chart extends Component {
  render() {
    return (
      <>
        <div class="wrapper">
          <Navhaut></Navhaut>
        </div>
        <Char></Char>

        <Footer></Footer>
      </>
    );
  }
}

export default Chart;
