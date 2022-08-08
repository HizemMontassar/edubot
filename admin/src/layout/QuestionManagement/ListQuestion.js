//import '../assets/dist/css/adminlte.min.css'
import React,  { useEffect } from 'react'  
import { useState } from "react";
import axios from 'axios';
import DataTableQuestion from './DataTableQuestion'


export function ListQuestion () { 
  const [questions, setQuestions] = useState(null);
  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
  useEffect(() => {
    
    axios.get('/quiz/getallques')
    .then(res=>{
      setQuestions(res.data);
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
              
                <h1>Questions</h1>
              </div>
             
            </div>
          </div>
        </section>
        <section class="content">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">List Questions</h3>
            </div>
        <div className="container">
                    <table className="table table-striped table-light">
                        <thead className="thead-light">
                            <tr>
                            
                                <td>question</td>
                                <td>response 1</td>
                                <td>response 2</td>
                                <td>response 3</td>
                                <td>the answer</td>
                                <td>Quiz Title</td>
                            </tr>
                        </thead>
                        <tbody>
                          {questions?.map((question,key)=>(<DataTableQuestion question={question} ></DataTableQuestion>))}
                            
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


export default ListQuestion
