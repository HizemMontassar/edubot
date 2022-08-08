import axios from 'axios'
import React, {useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Login()  {  
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [loginstatus,setlogin]=useState("")
  const [value, setValue] = React.useState('');

  let history = useHistory();

    const login=(e)=>{
    axios.post('/admin/login/',{username: username,
    password: password}).then(
      (response)=>{
        //console.log(response)
     // localStorage.setItem('Data',response.data.data.user.username);
     localStorage.setItem('Data',response.data.data);
      const getlocal=localStorage.getItem('Data');
      const decode=jwt_decode(getlocal)
      const username=decode.username;
			  

         if((getlocal !== "undefined" ) &&(getlocal !== null )){
           console.log('t3ada')
  history.push('/displayuser')         
         }else{
        //  history.push("/");
        console.log('mat3adash')
        alert('you are not  admin')
        //history.push('/')

         }
      //sessionStorage.setItem('cle', response);
      window.location.reload();

      
      } )}
      const logout=()=>{
        
         localStorage.removeItem('Data');
       //  history.push('/')
       window.location.reload();

      }
    return (
      <div class="content-wrapper">

      <div class="login-box">
      <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Sign in to start your session</p>

        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}  name='username'/>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}   name='password'/>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember"/>
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          <div class="col-4">

            <button type="submit" class="btn btn-primary btn-block" onClick={login }>Sign In</button>
          </div>
        </div>

     

    </div>
  </div>
  </div>
  </div>
    )
    }
export default Login
