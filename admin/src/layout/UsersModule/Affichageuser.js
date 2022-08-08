import { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Line, Pie } from "react-chartjs-2";

function Affichageuser() {
  const [username, setusername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  let history = useHistory();
  const [role, setrole] = useState("");
  ////////////////////
  const labels = ["activated", "desactivated"];
  const [chartData, SetchartData] = useState({});
  const [usersData, SetUsersData] = useState({});
  const chart = () => {
    var data = [5, 5];
    Axios.defaults.headers.common["Authorization"] =
      "bearer " + localStorage.getItem("Data");
    Axios.get("/admin/count")
      .then((res) => {
        SetUsersData(res.data);
        data[0]=res.data['activated'];
        data[1]=res.data['desactivated'];


        SetchartData({
          labels: labels,
          datasets: [
            {
              label: "Users",
              data: data,
              backgroundColor: ["rgba(255, 99, 132, 0.6)","rgba(255, 120, 92, 0.6)"],
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  ///////////////////
  useEffect(() => {
    chart();
  }, []);

  ///////////////////
  useEffect(() => {
    Axios.defaults.headers.common["Authorization"] =
      "bearer " + localStorage.getItem("Data");
    Axios.get("/admin/displayusers/")
      .then((res) => {
        setuserList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  //////////////////
  const [userList, setuserList] = useState([]);
  const getusers = () => {
    Axios.get("/admin/displayusers/").then((response) => {
      setuserList(response.data);
    });
  };
  const deleteuser = (id, e) => {
    window.location.reload();
    Axios.delete(`/admin/deleteuser/${id}`).then(
      (response) => {
        const getlocal = localStorage.getItem("Data");
        console.log(getlocal);
        history.push("/displayuser");
      }
    );
  };
  const disapleduser = (id) => {
    Axios.get(`/admin/disableduser/${id}`).then(
      (response) => {
        history.push("/displayuser");
        window.location.reload();
      }
    );
  };

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
                      <th>username</th>
                      <th>First</th>
                      <th>Last</th>
                      <th scope="col">email</th>
                      <th scope="col">activated</th>
                      <th scope="col">role</th>
                      <th scope="col">skills</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Disabled</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userList.map((val, key) => {
                      return (
                        <tr>
                          <td>{val.username}</td>
                          <td>{val.firstname}</td>
                          <td>{val.lastname}</td>
                          <td>{val.email}</td>
                          <td>{val.activated}</td>
                          <td>{val.role}</td>
                          <td>{val.newskills}</td>

                          <td>
                            <button
                              class="btn btn-outline-primary"
                              onClick={() => {
                                deleteuser(val._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              class="btn btn-outline-secondary"
                              onClick={() => {
                                disapleduser(val._id);
                              }}
                            >
                              Disabled
                            </button>
                          </td>
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
            <div class="card">
            <Pie data={chartData} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Affichageuser;