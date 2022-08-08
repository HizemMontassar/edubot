import React from 'react'  
import axios from 'axios';  
import { useState, useEffect } from 'react'  
import { useHistory,useParams } from "react-router-dom";


import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table ,Button} from 'reactstrap';  
function QuizzesShow() {
    const { id } = useParams();
    const [quiz, setquiz] = useState([]);  
    const history = useHistory();


    useEffect(() => {
    console.log("hello")
        axios.get('/quiz/filtersubquiz/'+id)
        .then(res=>{
            setquiz(res.data);
            console.log(quiz)
          
        })
        .catch(function (error){console.log(error);
        })
      },[]);
      
      const  handleSubmit = val => {
        //event.preventDefault();
        console.log(val);
        window.location.reload();
    
    
        axios.delete(`/quiz/deletequiz/${val}`)
          .then(res => {
          
            console.log(res);
            console.log(res.data);
          })
      }

    return(<> 
    
    
    
    <Table hover bordered striped responsive size="sm">  

<thead>  

  <tr>  

   

  <th>title</th> 

    <th>Action</th>


 

  </tr>  

</thead>  

<tbody>  

  {  

    quiz.map((item, idx) => {  
if (item.level==="hard")
{ return <tr  className="table-danger" >  
          

       
  <td>{item.title}</td>  
  <td>{item.level}</td>  
  <td>  

<div class="btn-group">  

<button className="btn btn-info mb-1 "  onClick={() =>history.push("/modifyquiz/"+item._id) }><i className="fas fa-edit"></i></button>  
<button className="btn btn-info mb-1  "  onClick={()=>handleSubmit(item._id)}><i className="fas fa-trash"></i></button>  



<button  className="btn btn-info mb-1" onClick={() =>history.push("/showquestion/"+item._id) }>Show Questions</button>  


</div>  

</td> 
  


</tr>}
else if (item.level==="medium")
{
  return <tr  className="table-warning">  
          

       
  <td>{item.title}</td>  
  <td>{item.level}</td>  
  <td>  

<div class="btn-group">  

<button className="btn btn-info mb-1 "  onClick={() =>history.push("/modifyquiz/"+item._id) }><i className="fas fa-edit"></i></button>  
<button className="btn btn-info mb-1 "  onClick={()=>handleSubmit(item._id)}><i className="fas fa-trash"></i></button>  



<button  className="btn btn-info mb-1" onClick={() =>history.push("/showquestion/"+item._id) }>Show Questions</button>  


</div>  

</td> 
  


</tr>
}
else{
  return <tr  className="table-success" >  
          

       
  <td>{item.title}</td>  
  <td>{item.level}</td>  
  <td>  

<div class="btn-group">  

<button className="btn btn-info mb-1 "  onClick={() =>history.push("/modifyquiz/"+item._id) }><i className="fas fa-edit"></i></button>  
<button className="btn btn-info mb-1 "  onClick={()=>handleSubmit(item._id)}><i className="fas fa-trash"></i></button>  



<button  className="btn btn-info mb-1" onClick={() =>history.push("/showquestion/"+item._id) }>Show Questions</button>  


</div>  

</td> 
  


</tr>
}
       

    })}  

</tbody>  

</Table>  
<button className="btn btn-info mb-1  mx-3"  onClick={() =>history.push("/addquiz") }>ADD Quizz</button>  
<button className="btn btn-info mb-1"  onClick={() =>history.push("/ListSub/") }>Exit</button>    
    
    </>)
 }



export default QuizzesShow