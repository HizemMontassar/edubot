import React, { Component } from "react";
import Navleft from "../Layout/Navleft";
import Navhaut from "../Layout/Navhaut";

import Chatbox from "../Layout/Chatbox";

import Profile from "../Layout/Profile";
import Footer from "../Layout/Footer";
import ListCourses from "../Layout/ListCourses";

export class Course extends Component {
  render() {
    return (
      <>
        <div>
          <Navhaut></Navhaut>
          <ListCourses></ListCourses>
        </div>
      </>
    );
  }
}

export default Course;
