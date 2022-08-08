import React, { Component } from "react";
import Navleft from "../Layout/Navleft";
import Navhaut from "../Layout/Navhaut";

import Time from "../Layout/TimeLine";
import Info from "../Layout/Infos";
import Footer from "../Layout/Footer";

export class TimeLine extends Component {
  render() {
    return (
      <>
        <div class="wrapper">
          <Navhaut></Navhaut>
          <Time></Time>
        </div>

        <Footer></Footer>
      </>
    );
  }
}

export default TimeLine;
