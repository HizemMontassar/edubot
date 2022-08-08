import React, { Component } from "react";
import Navleft from "../Layout/Navleft";
import Navhaut from "../Layout/Navhaut";
import Chat from "../Layout/Chat";
import Chatbox from "../Layout/Chatbox";

import Footer from "../Layout/Footer";

export class Discusion extends Component {
  render() {
    return (
      <>
        <div>
          <Navhaut></Navhaut>
          <Chat></Chat>
        </div>
        {/* <Chatbox></Chatbox> */}
        {/* <Footer></Footer> */}
      </>
    );
  }
}

export default Discusion;
