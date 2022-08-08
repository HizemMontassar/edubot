import axios from 'axios';
import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import { useHistory,useParams } from "react-router-dom";
import ChartQuiz from './ChartQuiz'
import Chartcourse from './Chartcourse';
function Charts (){  


    return( <>
        <div class="content-wrapper">
	  <div class="container-full">
		
		<div class="content-header">
			<div class="d-flex align-items-center">
				<div class="w-p100 d-md-flex align-items-center justify-content-between">
					<h3 class="page-title">ChartJS</h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
								<li class="breadcrumb-item" aria-current="page">Chart</li>
								<li class="breadcrumb-item active" aria-current="page">ChartJS</li>
							</ol>
						</nav>
					</div>
				</div>
				
			</div>
		</div>

		
		<section class="content">
		  <div class="row">
				
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">the most visited subcategory of quizzes</h4>
							<div>
								<ChartQuiz></ChartQuiz>
							</div>
						</div>
					</div>
				</div>
				
				
								<Chartcourse></Chartcourse>
					
			

		  </div>
	

		</section>

	  </div>
  </div>

        </>)

}


export default Charts;