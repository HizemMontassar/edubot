import React, { Component } from "react";
import Navleft from "../Layout/Navleft";
import Navhaut from "../Layout/Navhaut";

import Chatbox from "../Layout/Chatbox";

import Profile from "../Layout/Profile";
import Footer from "../Layout/Footer";

export class Profileuser extends Component {
  render() {
    return (
      <>
        <div class="wrapper">
          <Navhaut></Navhaut>
          <Profile></Profile>
        </div>
        {/* <Chatbox></Chatbox> */}
        <Footer></Footer>
      </>
    );
  }
}

export default Profileuser;
