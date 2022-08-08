//import '../assets/dist/css/adminlte.min.css'
import React,  { useEffect } from 'react'  
import { useState } from "react";
import axios from 'axios';
import DataTableQuiz from './DataTableQuiz'

export function ListQuiz () { 
  const [quizzes, setQuizzes] = useState(null);
  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
  useEffect(() => {
    
    axios.get('/quiz/getallquiz')
    .then(res=>{
      setQuizzes(res.data);
    })
    .catch(function (error){console.log(error);
    })
  },[]);
  
    return (
 
        <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
              
                <h1>Quizzes</h1>
              </div>
             
            </div>
          </div>
        </section>
        <section class="content">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">List Quizzes</h3>
            </div>
        <div className="container">
                    <table className="table table-striped table-light">
                        <thead className="thead-light">
                            <tr>
                              
                                <td>title</td>
                                <td>Level</td>
                                <td>sub-category name</td>
                               
                            </tr>
                        </thead>
                        <tbody >
                          {quizzes?.map((quiz,key)=>(<DataTableQuiz quiz={quiz} ></DataTableQuiz>))}
                            
                        </tbody>
                    </table>
                </div>     
        
            <div class="card-body">
              <div id="jsGrid1"></div>
            </div>
          </div>
        </section>
  
        </div>
        
    )
    }


export default ListQuiz
