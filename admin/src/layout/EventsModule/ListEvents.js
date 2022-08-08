import React, { Component } from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";


  
function ListEvents() {  

    const [userList, setuserList] = useState([]);

    useEffect(() => {
        Axios.get("/events/displayEvents/").then((res) => {
          setuserList(res.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      }, []);
        

    return (
        <div>

      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Users</h1>
              </div>
        
            </div>
          </div>
        </section>
        
        <section class="content">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Users</h3>
            </div>
            <div>
        
            <div>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th >Username</th>
                    <th >Event starting date</th>
                    <th >Event Ending Date</th>
                    <th scope="col">Event Type</th>

                  </tr>
                </thead>
             
                <tbody>
                {userList.map((val, key) => {
          return (
                  <tr>
                    <td>{val.idUser}</td>
                    <td>{val.startingDate}</td>
                    <td>{val.endingDate}</td>
                    <td>{val.eventType}</td>
                  </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
      
      </div>
            <div class="card-body">
              <div id="jsGrid1"></div>
            </div>
          </div>
        </section>
  
        </div>
    </div>
        
    )


}
export default ListEvents