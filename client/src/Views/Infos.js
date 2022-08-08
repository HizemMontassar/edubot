import React, { Component } from "react";
import Navleft from "../Layout/Navleft";
import Navhaut from "../Layout/Navhaut";
import Charts from "../Layout/Charts";
import Chatbox from "../Layout/Chatbox";
import Infos from "../Layout/Infos";

export class Chart extends Component {
  render() {
    return (
      <>
        <div>
          <Navhaut></Navhaut>
          <Infos></Infos>
        </div>
      </>
    );
  }
}

export default Chart;
