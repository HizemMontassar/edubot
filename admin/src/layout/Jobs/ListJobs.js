import { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";


function ListJobs() {
  let history = useHistory();
  const [jobsList, setJobsList] = useState([]);

///////////////////
useEffect(() => {
  Axios.defaults.headers.common["Authorization"] =
      "bearer " + localStorage.getItem("Data");
  Axios.get("/jobs/getAllJobs").then((res) => {
    setJobsList(res.data)
    })
    .catch(function (error) {
      console.log(error);
    });
}, []);

  return (
    <div >
      
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Jobs</h1>
              </div>
        
            </div>
          </div>
        </section>
        
        <section class="content">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Jobs Taken By users through our app</h3>
            </div>
            <div>
        
            <div>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th >Username</th>
                    <th >Salary</th>
                    <th >Country</th>
                    <th >Starting date</th>
                    <th >Ending date</th>
                    <th >Position</th>
                    <th >Contract</th>
                    <th >Type</th>
                  </tr>
                </thead>
             
                <tbody>
                {jobsList.map((val, key) => {
          return (  
                  <tr>
                    <td>{val.user.username}</td>
                    <td>{val.salary}</td>
                    <td>{val.country}</td>
                    <td>{val.starting_date}</td>
                    <td>{val.ending_date}</td>
                    <td>{val.position}</td>
                    <td>{val.contract}</td>
                    <td>{val.type}</td>   
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
    
  );
}

export default ListJobs;