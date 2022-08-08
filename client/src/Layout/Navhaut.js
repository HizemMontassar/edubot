import React, { Component } from 'react'  
import {  Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoogleLogin } from 'react-google-login';
import jwt_decode from "jwt-decode";
import Axios from "axios";
function Navhaut() {  
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
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [userList, setuserList] = useState([]);

  useEffect(() => {

   Axios.get(`/user/displayProfile/${id}/`).then((res) => {
     setuserList(res.data)
     })
     .catch(function (error) {
       console.log(error);
     });
 }, []);
  const loginandoauth=(response)=>{
  
  }
  Axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')	 
       
  var local=localStorage.getItem('Data');
      if((local !== "undefined" ) &&(local !== null )){
        const decode=jwt_decode(local)
        var Username=decode.username
        var iduser=decode._id
      console.log("idusssserr"+iduser);
      }else{
      //  history.push("/");
      console.log('mat3adash')
      //history.push('/')
      
      } 
  const responseSuccessGoogle=(response)=>{
    console.log(response)
    Axios({
      method:"POST",
      url:"/user/googlelogin/",
      data: {tokenId:response.tokenId}
    }).then(response => {
      localStorage.setItem('Data',response.data.data);
          const getlocal=localStorage.getItem('Data');
        
             if((getlocal !== "undefined" ) &&(getlocal !== null )){
               console.log('t3ada')
         
             }else{
            console.log('mat3adash')
             }
             window.location.reload();
    
    console.log('google login succes',response.data.data)
    })
    }
    
    const responseErrorGoogle=(response)=>{
      
    }
  const login=(e)=>{

    Axios.post('/user/login/',{username: username,
    password: password}).then(
      (response)=>{
     localStorage.setItem('Data',response.data.data);
      var getlocal=localStorage.getItem('Data');
      //const decode=jwt_decode(getlocal)
			 //  console.log('decode',decode._id)
        // console.log(response) 
        // console.log(getlocal)
        // history.push("/profile");

         if((getlocal !== "undefined" ) &&(getlocal !== null )){
           console.log('t3ada')
     
         }else{
        console.log('mat3adash')
         }
        window.location.reload();

      } )}
      const logout=()=>{

        localStorage.removeItem('Data');
     

     }
     if((local !== "undefined" ) &&(local !== null )){

        return (
            

            <header class="main-header">
	<div class="d-flex align-items-center logo-box pl-10">		
		<a href="#" class="waves-effect waves-light nav-link rounded d-none d-md-inline-block push-btn" data-toggle="push-menu" role="button">
			<img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/collapse.svg" class="img-fluid svg-icon" alt="collapse icon"/>
		</a>
		<Link to="/" class="logo">
		  <div class="logo-lg">
			  <span class="light-logo"><img src="../images/logo.png" alt="logo" className="logo img-square elevation-3"/></span>
			 
		  </div>
		</Link>
    {/* <Link to="/" class="brand-link">
      <img src="../images/logo.png" alt="AdminLTE Logo" class="brand-image img-square elevation-3" style={{'opacity': '.8'}} />
     
    </Link> */}
	</div> 
          <nav class="navbar navbar-static-top pl-10">
      
	  <div class="app-menu">
		<ul class="header-megamenu nav">
			<li class="btn-group nav-item d-none d-lg-inline-block ">
				<Link id="chat-popup" to="/" class="waves-effect waves-light nav-link rounded svg-bt-icon " title="">
					<img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/sms.svg" class="img-fluid svg-icon" alt="sms icon"/>
			    </Link>
			</li>

			<li class="btn-group nav-item d-none d-lg-inline-block">
				<Link to={`/timeline/${iduser}`}  class="waves-effect waves-light nav-link rounded svg-bt-icon" title="">
					<img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/correct.svg" class="img-fluid svg-icon" alt="correct icon"/>
			    </Link>
			</li>
			<li class="btn-group nav-item d-none d-lg-inline-block">
				<Link to ="/calendar" class="waves-effect waves-light nav-link rounded svg-bt-icon" title="">
					<img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/event.svg" class="img-fluid svg-icon" alt="event icon"/>
			    </Link>
			</li>
      <li class="btn-group nav-item d-none d-lg-inline-block">
        <Link to ="/course" class="waves-effect waves-light nav-link rounded svg-bt-icon" title="">
          <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/star.svg" class="img-fluid svg-icon" alt="star icon"/>
      </Link>
      </li>
      <li class="btn-group nav-item d-none d-lg-inline-block">
        <Link to="/Charts" class="waves-effect waves-light nav-link rounded svg-bt-icon" title="">
          <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/sidebar-menu/charts.svg" class="img-fluid svg-icon" alt="charts icon"/>
          </Link>
      </li>
      <li class="btn-group nav-item d-none d-lg-inline-block">
        <Link to="/cv" class="waves-effect waves-light nav-link rounded svg-bt-icon" title="">
          <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/pages.svg" class="img-fluid svg-icon" alt="pages icon"/>
          </Link>
      </li>
			
		</ul> 
	  </div>
    <div><strong>Schooled By EduBot</strong></div>
      <div class="navbar-custom-menu r-side">
        <ul class="nav navbar-nav">	
			<li class="btn-group nav-item">
				<a href="#" data-provide="fullscreen" class="waves-effect waves-light nav-link rounded full-screen" title="Full Screen">
					<img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/fullscreen.svg" class="img-fluid svg-icon" alt="fullscreen icon"/>
			    </a>
			</li>	  
			<li class="btn-group d-md-inline-flex d-none">
				<div class="app-menu">
					<div class="search-bx mx-5">
					
							<div class="input-group">
							  {/* <input type="text" class="form-control" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}} aria-label="Search" aria-describedby="button-addon2"/> */}
                {/* <input type="password" class="form-control" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} aria-label="Search" aria-describedby="button-addon2"/> */}

                <div class="input-group-append">
								{/* <button class="btn" type="submit" id="button-addon3" onClick={login}>login</button>
                <GoogleLogin class="btn" type="submit" id="button-addon3"
    clientId="672601858751-vhnn8mdk7d2r1j61vggtnmeljdqeliol.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  /> */}
							  </div>
							</div>
					</div>
				</div>
			</li>
		  
		
		  
	      
          <li class="dropdown user user-menu">
            <a href="#" class="waves-effect waves-light dropdown-toggle" data-toggle="dropdown" title="User">
				<img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/user.svg" class="rounded svg-icon" alt="user icon" />
            </a>
            <ul class="dropdown-menu animated flipInX">
             
              <li class="user-header bg-img" style={{'background-image': 'url(../images/user-info.jpg)'}} data-overlay="3">
				  <div class="flexbox align-self-center">					  
				  	<img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="user-image" class="float-left rounded-circle"/>					  
					<h4 class="user-name align-self-center">
					  <span>{userList.username}</span>
            <hr></hr>
					  <small>{userList.email}</small>
					</h4>
				  </div>
              </li>
              
              <li class="user-body">
            <div class="dropdown-item"><Link to="/profile" ><i class="ion ion-person" ></i>My Profile</Link></div>

            <Link to="/login" class="ion-log-out dropdown-item"  onClick={logout}>logout</Link>
					<div class="dropdown-divider"></div>
					<div class="p-10"><Link to="/profile" class="btn btn-sm btn-rounded btn-success">View Profile</Link></div>
              </li>
            </ul>
          </li>	
		  
          
          <li>
              <a href="#" data-toggle="control-sidebar" title="Setting" class="waves-effect waves-light">
			  	<img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/settings.svg" class="img-fluid svg-icon" alt="settings icon"/>
			  </a>
          </li>
			
        </ul>
      </div>
    </nav>
	<aside class="control-sidebar">
	  
      <div class="rpanel-title">
          <span class="pull-right btn btn-circle p-10">
              <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/close.svg" data-toggle="control-sidebar" class="img-fluid svg-icon" alt="close icon"/>
          </span> 
      </div>  
      
      
      <div class="tab-content">
        
        <div class="tab-pane" id="control-sidebar-home-tab">
            <div class="flexbox">
              <a href="javascript:void(0)" class="text-grey">
                  <i class="ti-more"></i>
              </a>	
              <p>Users</p>
              <a href="javascript:void(0)" class="text-right text-grey"><i class="ti-plus"></i></a>
            </div>
            <div class="lookup lookup-sm lookup-right d-none d-lg-block">
              <input type="text" name="s" placeholder="Search" class="w-p100"/>
            </div>
            <div class="media-list media-list-hover mt-20">
              <div class="media py-10 px-0">
                <a class="avatar avatar-lg status-success" href="#">
                  <img src="../images/avatar/1.jpg" alt="..."/>
                </a>
                <div class="media-body">
                  <p class="font-size-16">
                    <a class="hover-primary" href="#"><strong>Tyler</strong></a>
                  </p>
                  <p>Praesent tristique diam...</p>
                    <span>Just now</span>
                </div>
              </div>
  
              <div class="media py-10 px-0">
                <a class="avatar avatar-lg status-danger" href="#">
                  <img src="../images/avatar/2.jpg" alt="..."/>
                </a>
                <div class="media-body">
                  <p class="font-size-16">
                    <a class="hover-primary" href="#"><strong>Luke</strong></a>
                  </p>
                  <p>Cras tempor diam ...</p>
                    <span>33 min ago</span>
                </div>
              </div>
  
              <div class="media py-10 px-0">
                <a class="avatar avatar-lg status-warning" href="#">
                  <img src="../images/avatar/3.jpg" alt="..."/>
                </a>
                <div class="media-body">
                  <p class="font-size-16">
                    <a class="hover-primary" href="#"><strong>Evan</strong></a>
                  </p>
                  <p>In posuere tortor vel...</p>
                    <span>42 min ago</span>
                </div>
              </div>
  
              <div class="media py-10 px-0">
                <a class="avatar avatar-lg status-primary" href="#">
                  <img src="../images/avatar/4.jpg" alt="..."/>
                </a>
                <div class="media-body">
                  <p class="font-size-16">
                    <a class="hover-primary" href="#"><strong>Evan</strong></a>
                  </p>
                  <p>In posuere tortor vel...</p>
                    <span>42 min ago</span>
                </div>
              </div>			
              
              <div class="media py-10 px-0">
                <a class="avatar avatar-lg status-success" href="#">
                  <img src="../images/avatar/1.jpg" alt="..."/>
                </a>
                <div class="media-body">
                  <p class="font-size-16">
                    <a class="hover-primary" href="#"><strong>Tyler</strong></a>
                  </p>
                  <p>Praesent tristique diam...</p>
                    <span>Just now</span>
                </div>
              </div>
  
              <div class="media py-10 px-0">
                <a class="avatar avatar-lg status-danger" href="#">
                  <img src="../images/avatar/2.jpg" alt="..."/>
                </a>
                <div class="media-body">
                  <p class="font-size-16">
                    <a class="hover-primary" href="#"><strong>Luke</strong></a>
                  </p>
                  <p>Cras tempor diam ...</p>
                    <span>33 min ago</span>
                </div>
              </div>
  
              <div class="media py-10 px-0">
                <a class="avatar avatar-lg status-warning" href="#">
                  <img src="../images/avatar/3.jpg" alt="..."/>
                </a>
                <div class="media-body">
                  <p class="font-size-16">
                    <a class="hover-primary" href="#"><strong>Evan</strong></a>
                  </p>
                  <p>In posuere tortor vel...</p>
                    <span>42 min ago</span>
                </div>
              </div>
  
              <div class="media py-10 px-0">
                <a class="avatar avatar-lg status-primary" href="#">
                  <img src="../images/avatar/4.jpg" alt="..."/>
                </a>
                <div class="media-body">
                  <p class="font-size-16">
                    <a class="hover-primary" href="#"><strong>Evan</strong></a>
                  </p>
                  <p>In posuere tortor vel...</p>
                    <span>42 min ago</span>
                </div>
              </div>
                
            </div>
  
        </div>
       
        
        <div class="tab-pane" id="control-sidebar-settings-tab">
            <div class="flexbox">
              <a href="javascript:void(0)" class="text-grey">
                  <i class="ti-more"></i>
              </a>	
              <p>Todo List</p>
              <a href="javascript:void(0)" class="text-right text-grey"><i class="ti-plus"></i></a>
            </div>
          <ul class="todo-list mt-20">
              <li class="py-15 px-5 by-1">
                
                <input type="checkbox" id="basic_checkbox_1" class="filled-in"/>
                <label for="basic_checkbox_1" class="mb-0 h-15"></label>
                
                <span class="text-line">Nulla vitae purus</span>
                
                <small class="badge bg-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
                
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
              <li class="py-15 px-5">
               
                <input type="checkbox" id="basic_checkbox_2" class="filled-in"/>
                <label for="basic_checkbox_2" class="mb-0 h-15"></label>
                <span class="text-line">Phasellus interdum</span>
                <small class="badge bg-info"><i class="fa fa-clock-o"></i> 4 hours</small>
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
              <li class="py-15 px-5 by-1">
                
                <input type="checkbox" id="basic_checkbox_3" class="filled-in"/>
                <label for="basic_checkbox_3" class="mb-0 h-15"></label>
                <span class="text-line">Quisque sodales</span>
                <small class="badge bg-warning"><i class="fa fa-clock-o"></i> 1 day</small>
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
              <li class="py-15 px-5">
                
                <input type="checkbox" id="basic_checkbox_4" class="filled-in"/>
                <label for="basic_checkbox_4" class="mb-0 h-15"></label>
                <span class="text-line">Proin nec mi porta</span>
                <small class="badge bg-success"><i class="fa fa-clock-o"></i> 3 days</small>
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
              <li class="py-15 px-5 by-1">
                
                <input type="checkbox" id="basic_checkbox_5" class="filled-in"/>
                <label for="basic_checkbox_5" class="mb-0 h-15"></label>
                <span class="text-line">Maecenas scelerisque</span>
                <small class="badge bg-primary"><i class="fa fa-clock-o"></i> 1 week</small>
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
              <li class="py-15 px-5">
                
                <input type="checkbox" id="basic_checkbox_6" class="filled-in"/>
                <label for="basic_checkbox_6" class="mb-0 h-15"></label>
                <span class="text-line">Vivamus nec orci</span>
                <small class="badge bg-info"><i class="fa fa-clock-o"></i> 1 month</small>
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
              <li class="py-15 px-5 by-1">
                
                <input type="checkbox" id="basic_checkbox_7" class="filled-in"/>
                <label for="basic_checkbox_7" class="mb-0 h-15"></label>
                
                <span class="text-line">Nulla vitae purus</span>
                
                <small class="badge bg-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
                
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
              <li class="py-15 px-5">
                
                <input type="checkbox" id="basic_checkbox_8" class="filled-in"/>
                <label for="basic_checkbox_8" class="mb-0 h-15"></label>
                <span class="text-line">Phasellus interdum</span>
                <small class="badge bg-info"><i class="fa fa-clock-o"></i> 4 hours</small>
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
              <li class="py-15 px-5 by-1">
                
                <input type="checkbox" id="basic_checkbox_9" class="filled-in"/>
                <label for="basic_checkbox_9" class="mb-0 h-15"></label>
                <span class="text-line">Quisque sodales</span>
                <small class="badge bg-warning"><i class="fa fa-clock-o"></i> 1 day</small>
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
              <li class="py-15 px-5">
                
                <input type="checkbox" id="basic_checkbox_10" class="filled-in"/>
                <label for="basic_checkbox_10" class="mb-0 h-15"></label>
                <span class="text-line">Proin nec mi porta</span>
                <small class="badge bg-success"><i class="fa fa-clock-o"></i> 3 days</small>
                <div class="tools">
                  <i class="fa fa-edit"></i>
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
            </ul>
        </div>
       
      </div>
    </aside>
    </header>
    
        )
        
     }
     else{
      return (
            

        <header class="main-header">
<div class="d-flex align-items-center logo-box pl-10">		
<a href="#" class="waves-effect waves-light nav-link rounded d-none d-md-inline-block push-btn" data-toggle="push-menu" role="button">
  <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/collapse.svg" class="img-fluid svg-icon" alt="collapse icon"/>
</a>
<Link to="/" class="logo">
  <div class="logo-lg">
    <span class="light-logo"><img src="../images/logo.png" alt="logo" className="logo img-square elevation-3"/></span>
    <span class="dark-logo"><img src="../images/logo.png" alt="logo" className="logo img-square elevation-3"/></span>
  </div>
</Link>
</div> 
      <nav class="navbar navbar-static-top pl-10">
  
<div class="app-menu">
<ul class="header-megamenu nav">

<li class="btn-group nav-item d-none d-lg-inline-block ">
				<Link id="chat-popup" to="/" class="waves-effect waves-light nav-link rounded svg-bt-icon " title="">
					<img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/sms.svg" class="img-fluid svg-icon" alt="sms icon"/>
			    </Link>
			</li>
  
  
</ul> 
</div>
<div>Schooled By EduBot</div>
  <div class="navbar-custom-menu r-side">
    <ul class="nav navbar-nav">	
  <li class="btn-group nav-item">
    <a href="#" data-provide="fullscreen" class="waves-effect waves-light nav-link rounded full-screen" title="Full Screen">
      <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/fullscreen.svg" class="img-fluid svg-icon" alt=""/>
      </a>
  </li>	  
  <li class="btn-group d-md-inline-flex d-none">
    <div class="app-menu">
      <div class="search-bx mx-5">
      
          <div class="input-group">
            {/* <input type="text" class="form-control" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}} aria-label="Search" aria-describedby="button-addon2"/> */}
            {/* <input type="password" class="form-control" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} aria-label="Search" aria-describedby="button-addon2"/> */}

            <div class="input-group-append">
            {/* <button class="btn" type="submit" id="button-addon3" onClick={login}>login</button>
            <GoogleLogin class="btn" type="submit" id="button-addon3"
clientId="672601858751-vhnn8mdk7d2r1j61vggtnmeljdqeliol.apps.googleusercontent.com"
buttonText="Login"
onSuccess={responseSuccessGoogle}
onFailure={responseErrorGoogle}
cookiePolicy={'single_host_origin'}
/> */}
              <Link to ="/login"  title="">sign in</Link>
            </div>
          </div>
      </div>
    </div>
  </li>
  
  <li class="dropdown notifications-menu">
  <a href="#" class="waves-effect waves-light dropdown-toggle" data-toggle="dropdown" title="Notifications">
    <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/notifications.svg" class="img-fluid svg-icon" alt=""/>
  </a>
  <ul class="dropdown-menu animated bounceIn">

    <li class="header">
    <div class="p-20">
      <div class="flexbox">
        <div>
          <h4 class="mb-0 mt-0">Notifications</h4>
        </div>
        <div>
          <a href="#" class="text-danger">Clear All</a>
        </div>
      </div>
    </div>
    </li>

    <li>
    
    <ul class="menu sm-scrol">
      <li>
      <a href="#">
        <i class="fa fa-users text-info"></i> Curabitur id eros quis nunc suscipit blandit.
      </a>
      </li>
      <li>
      <a href="#">
        <i class="fa fa-warning text-warning"></i> Duis malesuada justo eu sapien elementum, in semper diam posuere.
      </a>
      </li>
      <li>
      <a href="#">
        <i class="fa fa-users text-danger"></i> Donec at nisi sit amet tortor commodo porttitor pretium a erat.
      </a>
      </li>
      <li>
      <a href="#">
        <i class="fa fa-shopping-cart text-success"></i> In gravida mauris et nisi
      </a>
      </li>
      <li>
      <a href="#">
        <i class="fa fa-user text-danger"></i> Praesent eu lacus in libero dictum fermentum.
      </a>
      </li>
      <li>
      <a href="#">
        <i class="fa fa-user text-primary"></i> Nunc fringilla lorem 
      </a>
      </li>
      <li>
      <a href="#">
        <i class="fa fa-user text-success"></i> Nullam euismod dolor ut quam interdum, at scelerisque ipsum imperdiet.
      </a>
      </li>
    </ul>
    </li>
    <li class="footer">
      <a href="#">View all</a>
    </li>
  </ul>
  </li>	
  
    
  
      
      <li>
          <a href="#" data-toggle="control-sidebar" title="Setting" class="waves-effect waves-light">
      <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/settings.svg" class="img-fluid svg-icon" alt=""/>
    </a>
      </li>
  
    </ul>
  </div>
</nav>
<aside class="control-sidebar">

  <div class="rpanel-title">
      <span class="pull-right btn btn-circle p-10">
          <img src="https://www.multipurposethemes.com/admin/chat-bot-admin-template/images/svg-icon/close.svg" data-toggle="control-sidebar" class="img-fluid svg-icon" alt=""/>
      </span> 
  </div>  
  
  
  <div class="tab-content">
    
    <div class="tab-pane" id="control-sidebar-home-tab">
        <div class="flexbox">
          <a href="javascript:void(0)" class="text-grey">
              <i class="ti-more"></i>
          </a>	
          <p>Users</p>
          <a href="javascript:void(0)" class="text-right text-grey"><i class="ti-plus"></i></a>
        </div>
        <div class="lookup lookup-sm lookup-right d-none d-lg-block">
          <input type="text" name="s" placeholder="Search" class="w-p100"/>
        </div>
        <div class="media-list media-list-hover mt-20">
          <div class="media py-10 px-0">
            <a class="avatar avatar-lg status-success" href="#">
              <img src="../images/avatar/1.jpg" alt="..."/>
            </a>
            <div class="media-body">
              <p class="font-size-16">
                <a class="hover-primary" href="#"><strong>Tyler</strong></a>
              </p>
              <p>Praesent tristique diam...</p>
                <span>Just now</span>
            </div>
          </div>

          <div class="media py-10 px-0">
            <a class="avatar avatar-lg status-danger" href="#">
              <img src="../images/avatar/2.jpg" alt="..."/>
            </a>
            <div class="media-body">
              <p class="font-size-16">
                <a class="hover-primary" href="#"><strong>Luke</strong></a>
              </p>
              <p>Cras tempor diam ...</p>
                <span>33 min ago</span>
            </div>
          </div>

          <div class="media py-10 px-0">
            <a class="avatar avatar-lg status-warning" href="#">
              <img src="../images/avatar/3.jpg" alt="..."/>
            </a>
            <div class="media-body">
              <p class="font-size-16">
                <a class="hover-primary" href="#"><strong>Evan</strong></a>
              </p>
              <p>In posuere tortor vel...</p>
                <span>42 min ago</span>
            </div>
          </div>

          <div class="media py-10 px-0">
            <a class="avatar avatar-lg status-primary" href="#">
              <img src="../images/avatar/4.jpg" alt="..."/>
            </a>
            <div class="media-body">
              <p class="font-size-16">
                <a class="hover-primary" href="#"><strong>Evan</strong></a>
              </p>
              <p>In posuere tortor vel...</p>
                <span>42 min ago</span>
            </div>
          </div>			
          
          <div class="media py-10 px-0">
            <a class="avatar avatar-lg status-success" href="#">
              <img src="../images/avatar/1.jpg" alt="..."/>
            </a>
            <div class="media-body">
              <p class="font-size-16">
                <a class="hover-primary" href="#"><strong>Tyler</strong></a>
              </p>
              <p>Praesent tristique diam...</p>
                <span>Just now</span>
            </div>
          </div>

          <div class="media py-10 px-0">
            <a class="avatar avatar-lg status-danger" href="#">
              <img src="../images/avatar/2.jpg" alt="..."/>
            </a>
            <div class="media-body">
              <p class="font-size-16">
                <a class="hover-primary" href="#"><strong>Luke</strong></a>
              </p>
              <p>Cras tempor diam ...</p>
                <span>33 min ago</span>
            </div>
          </div>

          <div class="media py-10 px-0">
            <a class="avatar avatar-lg status-warning" href="#">
              <img src="../images/avatar/3.jpg" alt="..."/>
            </a>
            <div class="media-body">
              <p class="font-size-16">
                <a class="hover-primary" href="#"><strong>Evan</strong></a>
              </p>
              <p>In posuere tortor vel...</p>
                <span>42 min ago</span>
            </div>
          </div>

          <div class="media py-10 px-0">
            <a class="avatar avatar-lg status-primary" href="#">
              <img src="../images/avatar/4.jpg" alt="..."/>
            </a>
            <div class="media-body">
              <p class="font-size-16">
                <a class="hover-primary" href="#"><strong>Evan</strong></a>
              </p>
              <p>In posuere tortor vel...</p>
                <span>42 min ago</span>
            </div>
          </div>
            
        </div>

    </div>
   
    
    <div class="tab-pane" id="control-sidebar-settings-tab">
        <div class="flexbox">
          <a href="javascript:void(0)" class="text-grey">
              <i class="ti-more"></i>
          </a>	
          <p>Todo List</p>
          <a href="javascript:void(0)" class="text-right text-grey"><i class="ti-plus"></i></a>
        </div>
      <ul class="todo-list mt-20">
          <li class="py-15 px-5 by-1">
            
            <input type="checkbox" id="basic_checkbox_1" class="filled-in"/>
            <label for="basic_checkbox_1" class="mb-0 h-15"></label>
            
            <span class="text-line">Nulla vitae purus</span>
            
            <small class="badge bg-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
            
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
          <li class="py-15 px-5">
           
            <input type="checkbox" id="basic_checkbox_2" class="filled-in"/>
            <label for="basic_checkbox_2" class="mb-0 h-15"></label>
            <span class="text-line">Phasellus interdum</span>
            <small class="badge bg-info"><i class="fa fa-clock-o"></i> 4 hours</small>
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
          <li class="py-15 px-5 by-1">
            
            <input type="checkbox" id="basic_checkbox_3" class="filled-in"/>
            <label for="basic_checkbox_3" class="mb-0 h-15"></label>
            <span class="text-line">Quisque sodales</span>
            <small class="badge bg-warning"><i class="fa fa-clock-o"></i> 1 day</small>
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
          <li class="py-15 px-5">
            
            <input type="checkbox" id="basic_checkbox_4" class="filled-in"/>
            <label for="basic_checkbox_4" class="mb-0 h-15"></label>
            <span class="text-line">Proin nec mi porta</span>
            <small class="badge bg-success"><i class="fa fa-clock-o"></i> 3 days</small>
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
          <li class="py-15 px-5 by-1">
            
            <input type="checkbox" id="basic_checkbox_5" class="filled-in"/>
            <label for="basic_checkbox_5" class="mb-0 h-15"></label>
            <span class="text-line">Maecenas scelerisque</span>
            <small class="badge bg-primary"><i class="fa fa-clock-o"></i> 1 week</small>
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
          <li class="py-15 px-5">
            
            <input type="checkbox" id="basic_checkbox_6" class="filled-in"/>
            <label for="basic_checkbox_6" class="mb-0 h-15"></label>
            <span class="text-line">Vivamus nec orci</span>
            <small class="badge bg-info"><i class="fa fa-clock-o"></i> 1 month</small>
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
          <li class="py-15 px-5 by-1">
            
            <input type="checkbox" id="basic_checkbox_7" class="filled-in"/>
            <label for="basic_checkbox_7" class="mb-0 h-15"></label>
            
            <span class="text-line">Nulla vitae purus</span>
            
            <small class="badge bg-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
            
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
          <li class="py-15 px-5">
            
            <input type="checkbox" id="basic_checkbox_8" class="filled-in"/>
            <label for="basic_checkbox_8" class="mb-0 h-15"></label>
            <span class="text-line">Phasellus interdum</span>
            <small class="badge bg-info"><i class="fa fa-clock-o"></i> 4 hours</small>
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
          <li class="py-15 px-5 by-1">
            
            <input type="checkbox" id="basic_checkbox_9" class="filled-in"/>
            <label for="basic_checkbox_9" class="mb-0 h-15"></label>
            <span class="text-line">Quisque sodales</span>
            <small class="badge bg-warning"><i class="fa fa-clock-o"></i> 1 day</small>
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
          <li class="py-15 px-5">
            
            <input type="checkbox" id="basic_checkbox_10" class="filled-in"/>
            <label for="basic_checkbox_10" class="mb-0 h-15"></label>
            <span class="text-line">Proin nec mi porta</span>
            <small class="badge bg-success"><i class="fa fa-clock-o"></i> 3 days</small>
            <div class="tools">
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash-o"></i>
            </div>
          </li>
        </ul>
    </div>
   
  </div>
</aside>
</header>

    )
     }


    }
export default Navhaut;