import React, { Component } from 'react'
import {  Link } from "react-router-dom";
export class Notfound extends Component {

    render() {
        return (<>
        <body class="hold-transition theme-primary bg-gradient-primary">
	
	<section class="error-page h-p100">
		<div class="container h-p100">
		  <div class="row h-p100 align-items-center justify-content-center text-center">
			  <div class="col-lg-7 col-md-10 col-12">
				  <div class="rounded5 bg-white-10 pb-50">
					  <h1 class="text-white font-size-180 font-weight-bold error-page-title"> 404</h1>
					  <h1 class="text-white">Page Not Found !</h1>
					  <h2 class="text-white">looks like, page doesn't exist</h2>
					  <div class="my-30"><Link to="/" class="btn btn-danger">Back to dashboard</Link></div>				  

					  <form class="search-form mx-auto mt-30 w-p75">
						<div class="input-group rounded5 overflow-h">
						  <input type="text" name="search" class="form-control" placeholder="Search"/>
						  <div class="input-group-prepend">
							  <button type="submit" name="submit" class="btn btn-danger btn-sm"><i class="fa fa-search"></i></button>
							</div>
						</div>
						
					  </form>
				  </div>
			  </div>				
		  </div>
		</div>
	</section>





</body>
        </>)}}
export default Notfound ;