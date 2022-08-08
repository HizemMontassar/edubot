import React, { Component } from 'react'  
import { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Sidebar() {  
  const [userList, setuserList] = useState([]);
  var local=localStorage.getItem('Data');
  if((local !== "undefined" ) &&(local !== null )){
    const decode=jwt_decode(local)
    var Username=decode.username
    var id=decode._id

  }else{
 //  history.push("/");
 console.log('mat3adash')
 //history.push('/')

  }
  useEffect(() => {

  
    Axios.get(`/admin/displayProfile/${id}/`).then((res) => {
      setuserList(res.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
       
      return (
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a href="index.html" class="brand-link">
      <img src="../assets/img/logo.png" alt="AdminLTE Logo" class="brand-image img-square elevation-3" style={{'opacity': '.8'}} />
      <span className="brand-text font-weight-light">EduBot Dashboard</span>
    </a>

    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="../assets/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <a href="#" class="d-block">{userList.username}</a>
        </div>
      </div>



      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
         <li className="nav-item">
            <a href="index.html" class="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
              </p>
            </a>
        </li>
        
        <li className="nav-item">
            <a href="#" class="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                Users
                <i className="fas fa-angle-right right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/admindashboard/displayuser" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Users List</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/admindashboard/adduser" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add User</p>
                </a>
              </li>
            </ul>
          </li>
            
            <li className="nav-item">
            <a href="#" class="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                Quizzes
                <i className="fas fa-angle-right right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/admindashboard/listquiz" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Quizzes List</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/admindashboard/addquiz" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add Quiz</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/admindashboard/markslist" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Marks</p>
                </a>
              </li>
            </ul>
          </li>
          
          <li className="nav-item">
            <a href="#" class="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                sub-Categories
                <i className="fas fa-angle-right right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/admindashboard/ListSub" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>sub-Categories list</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/admindashboard/AddSub" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add sub-Caategory</p>
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a href="#" class="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                Categories
                <i className="fas fa-angle-right right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/admindashboard/ListCat" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Categories list</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/admindashboard/AddCat" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Sub-Category list</p>
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a  class="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                Jobs
                <i className="fas fa-angle-right right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/admindashboard/jobslist" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Jobs taken list</p>
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a href="#" class="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                Questions
                <i className="fas fa-angle-right right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/admindashboard/addquestion" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Add Question</p>
                </a>
              </li>
              <li class="nav-item">
                  <a href="/admindashboard/listquestions" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Questions List</p>
                </a>
              </li>
            </ul>
          </li>


          <li className="nav-item">
            <a href="#" class="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                Events
                <i className="fas fa-angle-right right"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <a href="/admindashboard/eventslist" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Show Events</p>
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a href="/admindashboard/ListCourses" class="nav-link">
              <i className="nav-icon far fa-image"></i>
              <p>
                Courses
              </p>
            </a>
        </li> 
        <li className="nav-item">
            <a href="/admindashboard/Chart" class="nav-link">
              <i className="nav-icon far fa-image"></i>
              <p>
              charts
              </p>
            </a>
        </li> 
        {/* <li className="nav-item">
            <a href="/admindashboard/chartCourse" class="nav-link">
              <i className="nav-icon far fa-image"></i>
              <p>
              chart Course
              </p>
            </a>
        </li>    
        <li className="nav-item">
            <a href="/admindashboard/ChartQuiz" class="nav-link">
              <i className="nav-icon far fa-image"></i>
              <p>
              chart Quiz
              </p>
            </a>
        </li>  */}
            
        </ul>
      </nav>
    </div>
  </aside>

     
    )
    

}
export default Sidebar