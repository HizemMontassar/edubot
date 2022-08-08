import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function AddUsers() {
  const [username, setusername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  let history = useHistory();
  const [role, setrole] = useState("");
  const [image, setimage] = useState("");

  const [userList, setuserList] = useState([]);

  const adduser = () => {
    Axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')

    Axios.post("/admin/adduser/", {
      username: username,
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email,
      image: image,
    }).then((response) => {
      history.push("/displayuser");
    });
  };

  return (
    <div class="content-wrapper">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">UserName</label>
          <input
            class="form-control"
            type="email"
            type="text"
            onChange={(event) => {
              setusername(event.target.value);
            }}
            placeholder="username"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">FirstName</label>
          <input
            class="form-control"
            type="text"
            onChange={(event) => {
              setfirstname(event.target.value);
            }}
            placeholder="FirstName"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">LastName</label>
          <input
            class="form-control"
            type="text"
            onChange={(event) => {
              setlastname(event.target.value);
            }}
            placeholder="LastName"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Password</label>
          <input
            class="form-control"
            type="password"
            onChange={(event) => {
              setpassword(event.target.value);
            }}
            placeholder="Password"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Email</label>
          <input
            class="form-control"
            type="text"
            onChange={(event) => {
              setemail(event.target.value);
            }}
            placeholder="exemple@exemple.com"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Image</label>
          <input
            class="form-control"
            type="file"
            onChange={(event) => {
              setimage(event.target.value);
            }}
            placeholder="Image"
          />
        </div>
      </div>

      <button
        type="submit"
        onClick={adduser}
        class="btn btn-primary"
        value="add user"
      >
        Add user
      </button>
     
    </div>
  );
}

export default AddUsers;
