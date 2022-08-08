import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
export class Navleft extends Component {
  render() {
    axios.defaults.headers.common["Authorization"] =
      "bearer " + localStorage.getItem("Data");

    var local = localStorage.getItem("Data");
    if (local !== "undefined" && local !== null) {
      const decode = jwt_decode(local);
      var Username = decode.username;
      var iduser = decode._id;
      console.log("idusssserr" + iduser);
    } else {
      //  history.push("/");
      console.log("mat3adash");
      //history.push('/')
    }

    return (
      <>
        <aside class="main-sidebar">
          <section class="sidebar">
            <ul class="sidebar-menu" data-widget="tree">
              <li class="treeview">
                <ul class="treeview-menu">
                  <li>
                    <Link to="/chat">
                      <i class="ti-more"></i>Dashboard 1
                    </Link>
                  </li>
                </ul>
              </li>

              <li class="header">TO DO</li>

              <li class="treeview">
                <a href="#">
                  <img
                    src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/sidebar-menu/apps.svg"
                    class="svg-icon"
                    alt=""
                  ></img>
                  <span>TO DO</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-right pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li>
                    <Link to="/calendar">
                      <i class="ti-more"></i>Calendar
                    </Link>
                  </li>
                </ul>
              </li>

              <li class="header">User Pages</li>

              <li class="treeview">
                <a href="#">
                  <img
                    src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/sidebar-menu/pages.svg"
                    class="svg-icon"
                    alt=""
                  ></img>
                  <span>User Pages</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-right pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li>
                    <Link to="/profile">
                      <i class="ti-more"></i>User Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/course">
                      <i class="ti-more"></i>User Courses
                    </Link>
                  </li>
                </ul>
              </li>

              <li class="header">Charts </li>

              <li class="treeview">
                <a href="#">
                  <img
                    src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/sidebar-menu/charts.svg"
                    class="svg-icon"
                    alt=""
                  />
                  <span>Charts</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-right pull-right"></i>
                  </span>
                </a>

                <ul class="treeview-menu">
                  {/* <li><a href="charts_chartjs.html"><i class="ti-more"></i>ChartJS</a></li>
            <li><Link to="/chartcourse"><i class="ti-more"></i>ChartCourse</Link></li>
            <li><Link to={`/chartQuizuser/${iduser}`}><i class="ti-more"></i>ChartQuizUser</Link></li> */}
                  <li>
                    <Link to={`/Charts/${iduser}`}>
                      <i class="ti-more"></i>Charts
                    </Link>
                  </li>
                </ul>
              </li>

              {/* <li class="treeview">
          <a href="#">
            <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/sidebar-menu/maps.svg" class="svg-icon" alt=""/>
			<span>Maps</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-right pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            
            <li><a href="map_vector.html"><i class="ti-more"></i>Vector Map</a></li>
          </ul>
        </li> */}
            </ul>
          </section>
        </aside>
      </>
    );
  }
}
export default Navleft;
