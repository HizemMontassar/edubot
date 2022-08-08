import axios from 'axios';
import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import { useHistory,useParams } from "react-router-dom";
import { useState, useEffect } from 'react' 

function Infos (){  
    const { id } = useParams();
	const [cat, setcat] = useState([]);  



    useEffect(() => {
		let t=[];
		console.log("TYYYYTTT"+id)
			axios.get('/marks/filterskillsdecouverte/'+id)
			.then(res=>{console.log(res.data);
				setcat(res.data);
				console.log("UUU");
				console.log(cat);
				cat.map((v,i)=>{console.log(v);})
			  
			})
			.catch(function (error){console.log(error);
			})
		  },[]);

    return( <>


  <div class="content-wrapper">
	  <div class="container-full">
	
		<div class="content-header">
			<div class="d-flex align-items-center">
				<div class="w-p100 d-md-flex align-items-center justify-content-between">
					<h3 class="page-title">Profiling</h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
								<li class="breadcrumb-item" aria-current="page">Extra</li>
								<li class="breadcrumb-item active" aria-current="page">Profiling</li>
							</ol>
						</nav>
					</div>
				</div>
				
			</div>
		</div>  
		
		{cat.map((v,i)=>{console.log(v);
 					<div>hhhhh	{v}</div>
					  })
					

					  }
		
		<section class="content">

		  <div class="row">
			<div class="col-lg-6 connectedSortable">
			  
			  <div class="box box-solid box-primary">
				<div class="box-header with-border">
				  <h4 class="box-title">Discovered Skills </h4>

				  <ul class="box-controls pull-right">
					<li><a class="box-btn-close" href="#"></a></li>
					<li><a class="box-btn-slide" href="#"></a></li>	
					<li><a class="box-btn-fullscreen" href="#"></a></li>
				  </ul>
				</div>
				<div class="box-body p-0">
				  <ul class="todo-list">
					<li>
				
					 
					  
					  <input type="checkbox" id="basic_checkbox_13" class="filled-in"/>
					  <div>{cat.map((v,i)=>
			<div>  <span class="text-line">{v}</span></div>
		)}</div>
					 
					 
					  
					
					</li>
				</ul>
                    
                </div>

                </div>
                <div class="box box-solid box-primary">
				<div class="box-header with-border">
				  <h4 class="box-title">Courses Progress</h4>

				  <ul class="box-controls pull-right">
					<li><a class="box-btn-close" href="#"></a></li>
					<li><a class="box-btn-slide" href="#"></a></li>	
					<li><a class="box-btn-fullscreen" href="#"></a></li>
				  </ul>
				</div>
				<div class="box-body p-0">
				  <ul class="todo-list">
					<li>
				
					  <span class="handle">
							<i class="fa fa-ellipsis-v"></i>
							<i class="fa fa-ellipsis-v"></i>
						  </span>
					  
					  <input type="checkbox" id="basic_checkbox_13" class="filled-in"/>
					  <label for="basic_checkbox_13" class="mb-0 h-15 ml-15"></label>
					 
					  <span class="text-line">Nulla vitae purus</span>
					 
					  <small class="badge bg-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
					  
					  <div class="tools">
						<i class="fa fa-edit"></i>
						<i class="fa fa-trash-o"></i>
					  </div>
					</li>
				</ul>
                    
                </div>


                </div>
                <div class="box box-solid box-primary">
				<div class="box-header with-border">
				  <h4 class="box-title">Quizzes Done</h4>

				  <ul class="box-controls pull-right">
					<li><a class="box-btn-close" href="#"></a></li>
					<li><a class="box-btn-slide" href="#"></a></li>	
					<li><a class="box-btn-fullscreen" href="#"></a></li>
				  </ul>
				</div>
				<div class="box-body p-0">
				  <ul class="todo-list">
					<li>
				
					  <span class="handle">
							<i class="fa fa-ellipsis-v"></i>
							<i class="fa fa-ellipsis-v"></i>
						  </span>
					  
					  <input type="checkbox" id="basic_checkbox_13" class="filled-in"/>
					  <label for="basic_checkbox_13" class="mb-0 h-15 ml-15"></label>
					 
					  <span class="text-line">Nulla vitae purus</span>
					 
					  <small class="badge bg-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
					  
					  <div class="tools">
						<i class="fa fa-edit"></i>
						<i class="fa fa-trash-o"></i>
					  </div>
					</li>
				</ul>
                    
                </div>
                

                </div>

                <div class="box box-solid box-primary">
				<div class="box-header with-border">
				  <h4 class="box-title">Jobs applied</h4>

				  <ul class="box-controls pull-right">
					<li><a class="box-btn-close" href="#"></a></li>
					<li><a class="box-btn-slide" href="#"></a></li>	
					<li><a class="box-btn-fullscreen" href="#"></a></li>
				  </ul>
				</div>
				<div class="box-body p-0">
				  <ul class="todo-list">
					<li>
				
					  <span class="handle">
							<i class="fa fa-ellipsis-v"></i>
							<i class="fa fa-ellipsis-v"></i>
						  </span>
					  
					  <input type="checkbox" id="basic_checkbox_13" class="filled-in"/>
					  <label for="basic_checkbox_13" class="mb-0 h-15 ml-15"></label>
					 
					  <span class="text-line">Nulla vitae purus</span>
					 
					  <small class="badge bg-danger"><i class="fa fa-clock-o"></i> 2 mins</small>
					  
					  <div class="tools">
						<i class="fa fa-edit"></i>
						<i class="fa fa-trash-o"></i>
					  </div>
					</li>
				</ul>
                    
                </div>

                </div>
                </div>
                </div>
                </section>
                </div>
                </div>

    </>)
}
export default Infos;