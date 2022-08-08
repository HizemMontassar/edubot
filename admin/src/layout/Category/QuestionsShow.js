import React from 'react'  
import axios from 'axios';  
import { useState, useEffect } from 'react'  
import { useHistory,useParams } from "react-router-dom";


import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table ,Button} from 'reactstrap';  
function QuestionsShow() {
    const { id } = useParams();
    const [question, setquestion] = useState([]);  
    const history = useHistory();


    useEffect(() => {
    console.log("hello")
        axios.get('/quiz/filterquesquiz/'+id)
        .then(res=>{
            setquestion(res.data);
            console.log(question)
          
        })
        .catch(function (error){console.log(error);
        })
      },[]);
      
      const  handleSubmit = val => {
        //event.preventDefault();
        console.log(val);
        window.location.reload();
    
    
        axios.delete(`/quiz/deleteques/${val}`)
          .then(res => {
          
            console.log(res);
            console.log(res.data);
          })
      }

      const exit =val=>{
          axios.get(`/quiz/getquiz/${val}`)
          .then(res=>{ console.log(res.data.subcategory)
            history.push("/showquizzes/"+res.data.subcategory)  
          })
      }
    

    return(<> 
    
    
    
    <Table hover bordered striped responsive size="sm">  

<thead>  

  <tr>  

   

  <th>question</th> 

    <th>response 1</th>
    <th>response 2</th> 
    <th>response 3</th>
    <th>the answer</th> 



 

  </tr>  

</thead>  

<tbody>  

  {  

    question.map((item, idx) => {  

      return <tr >  
          


        <td>{item.question}</td>  
        <td>{item.rep1}</td>  
        <td>{item.rep2}</td>  
        <td>{item.rep3}</td>  
        
        <td>{item.repcorrecte}</td>  
        <td>  

<div class="btn-group">  

 

<button  className="btn btn-info mb-1  " onClick={() =>history.push("/modifyquestion/"+item._id) }><i className="fas fa-edit"></i></button>  
<button  className="btn btn-info mb-1" onClick={()=>handleSubmit(item._id)}><i className="fas fa-trash"></i></button>  
</div>  

</td> 
        


      </tr>  

    })}  

</tbody>  

</Table>  
  <button className="btn btn-info mb-1  mx-3 "  onClick={() =>history.push("/addquestion") }>ADD Question</button>  
  <button className="btn btn-info mb-1" onClick={() =>exit(id) }>Exit</button>  
    </>)
 }



export default QuestionsShow