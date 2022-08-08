import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const DataTableQuiz = (props) => {
    const [test, setTest] = useState("")
    const history = useHistory();
console.log(props)

useEffect(() => {
   // console.log(props.question.quiz)
axios.get('/quiz/getsub/'+props.quiz.subcategory)
.then(res=>{setTest(res.data.name)})
.catch((err)=>console.log(err));

}

)


  const  handleSubmit = event => {
    event.preventDefault();
    window.location.reload();


    axios.delete(`/quiz/deletequiz/${props.quiz._id}`)
      .then(res => {
      
        console.log(res);
        console.log(res.data);
      })
  }


 
   
  if(props.quiz.level==="hard")
  { return (
      <tr className="table-danger">
         
          <td>
              {props.quiz.title}
          </td>
          <td>
              {props.quiz.level}
          </td>
          <td>
              {test}
          </td>
        
          <td>
              <button className="btn btn-info mb-1 mx-3"   onClick={handleSubmit}  ><i className="fas fa-trash"></i></button>
          
              <button className="btn btn-info mb-1"  onClick={() =>history.push("/modifyquiz/"+props.quiz._id) }><i className="fas fa-edit"></i></button>
          </td>
      </tr>
  )}
  else if(props.quiz.level==="medium") 
  {return(<tr className="table-warning">
                 
  <td>
      {props.quiz.title}
  </td>
  <td>
      {props.quiz.level}
  </td>
  <td>
      {test}
  </td>
  
  <td>
      <button className="btn btn-info mb-1 mx-3"   onClick={handleSubmit}  ><i className="fas fa-trash"></i></button>
  
      <button className="btn btn-info mb-1"  onClick={() =>history.push("/modifyquiz/"+props.quiz._id) }><i className="fas fa-edit"></i></button>
  </td>
  </tr>
  )
      }
      else{
          return(
              <tr className="table-success">
                 
              <td>
                  {props.quiz.title}
              </td>
              <td>
                  {props.quiz.level}
              </td>
              <td>
                  {test}
              </td>
            
              <td>
                  <button className="btn btn-info mb-1 mx-3"   onClick={handleSubmit}  ><i className="fas fa-trash"></i></button>
              
                  <button className="btn btn-info mb-1"  onClick={() =>history.push("/modifyquiz/"+props.quiz._id) }><i className="fas fa-edit"></i></button>
              </td>
          </tr>
  
          )
      }
    
}

export default DataTableQuiz;