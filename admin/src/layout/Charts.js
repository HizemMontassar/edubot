import axios from 'axios';
import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import { useHistory,useParams } from "react-router-dom";
import ChartQuiz from './QuizzesManagement/StatQuiz'
import Chartcourse from './Courses/ChartCourse';
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
				
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Courses</h4>
							<div>
								<Chartcourse></Chartcourse>
							</div>
						</div>
					</div>
				</div>
			
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Bar Chart</h4>
							<div>
								<canvas id="bar-chart-horizontal2" height="200"></canvas>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Bar Chart</h4>
							<div>
								<canvas id="bar-chart2" height="365"></canvas>
							</div>
						</div>
					</div>
				</div>
							
			    <div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Line Chart</h4>
							<div>
								<canvas id="line-chart1" height="200"></canvas>
							</div>
						</div>
					</div>
				</div>
			
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Line Chart</h4>
							<div>
								<canvas id="line-chart2" height="200"></canvas>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Polar Area Chart</h4>
							<div>
								<canvas id="polar-chart1" height="200"></canvas>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Polar area Chart</h4>
							<div>
								<canvas id="polar-chart2" height="200"></canvas>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Radar Chart</h4>
							<div>
								<canvas id="radar-chart1" height="200"></canvas>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Radar Chart</h4>
							<div>
								<canvas id="radar-chart2" height="200"></canvas>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Doughnut Chart</h4>
							<div>
								<canvas id="doughnut-chart" height="200"></canvas>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-xl-6 col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Pie Chart</h4>
							<div>
								<canvas id="pie-chart" height="200"></canvas>
							</div>
						</div>
					</div>
				</div>
				
				<div class="col-12">
					<div class="box">
						<div class="box-body">
							<h4 class="box-title">Bubble Chart</h4>
							<div>
								<canvas id="bubble-chart" height="100"></canvas>
							</div>
						</div>
					</div>
				</div>
			

		  </div>
	

		</section>

	  </div>
  </div>

        </>)

}


export default Charts;