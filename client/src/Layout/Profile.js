import { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "react-google-login";

function Profile() {
  var local = localStorage.getItem("Data");
  if (local !== "undefined" && local !== null) {
    const decode = jwt_decode(local);
    var Username = decode.username;
    var id = decode._id;
  } else {
    //  history.push("/");
    console.log("mat3adash");
    //history.push('/')
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newusername, setnewUsername] = useState(Username);
  const [newpassword, setnewPassword] = useState("");
  const [usernamer, setUsernamer] = useState("");
  const [emailr, setemailr] = useState("");
  const [lastnamer, setlastnamer] = useState("");
  const [firstnamer, setfirstnamer] = useState("");
  const [imager, setimager] = useState("");
  let history = useHistory();

  const [userList, setuserList] = useState([]);

  useEffect(() => {
    Axios.get(`/user/displayProfile/${id}/`)
      .then((res) => {
        setuserList(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const changepassword = (e) => {
    Axios.post("/user/changepassword/", {
      username: newusername,
      password: newpassword,
    }).then((response) => {
      console.log(response);
      window.location.reload()
            alert('password changed succesfuly')
    });
  };
 
  return (
    <section class="content">
      <div class="container">
        <div class="profile">
          <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
              <div class="profile-header-img">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="user-image"
                />
              </div>
              <ul class="profile-header-tab nav nav-tabs nav-tabs-v2">
                <h3>
                  <em>Account informations</em>
                </h3>
              </ul>
            </div>
          </div>

          <div class="profile-container">
            <div class="profile-sidebar">
              <div class="desktop-sticky-top">
                <h4>{userList.username}</h4>
                <div class="font-weight-600 mb-3 text-muted mt-n2">
                  {userList.email}
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="tab-content profile-tab" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="row">
                    <div class="col-md-6">
                      <label>FIRST NAME</label>
                    </div>
                    <div class="col-md-6">
                      <p>{userList.firstname}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>LAST NAME</label>
                    </div>
                    <div class="col-md-6">
                      <p>{userList.lastname}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Email</label>
                    </div>
                    <div class="col-md-6">
                      <p>{userList.email}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>Role</label>
                    </div>
                    <div class="col-md-6">
                      <p>{userList.role}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <label>new password</label>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group mx-sm-3 mb-2">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="password" class="form-control" id="inputPassword2" onChange={(e)=>{setnewPassword(e.target.value)}} placeholder="Password"/>
  </div>
  <button type="submit" class="btn btn-primary mb-2" onClick={changepassword}>update</button>

                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
