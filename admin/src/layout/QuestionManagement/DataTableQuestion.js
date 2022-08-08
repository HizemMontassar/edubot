import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const DataTableQuestion = (props) => {
    const [test, setTest] = useState("")
    const history = useHistory();
console.log(props)

useEffect(() => {
    console.log(props.question.quiz)
axios.get('/quiz/getquiz/'+props.question.quiz)
.then(res=>{setTest(res.data.title)})
.catch((err)=>console.log(err));

})
  const  handleSubmit = event => {
    event.preventDefault();
    window.location.reload();


    axios.delete(`/quiz/deleteques/${props.question._id}`)
      .then(res => {
      
        console.log(res);
        console.log(res.data);
      })
  }


 
   
        
        return (
            <tr>
           
                <td>
                    {props.question.question}
                </td>
                <td>
                    {props.question.rep1}
                </td>
                <td>
                    {props.question.rep2}
                </td>
                <td>
                    {props.question.rep3}
                </td>
                <td>
                    {props.question.repcorrecte}
                </td>
                <td>
                    {test}
                </td>
                <td>
                    <button className="btn btn-info mb-1 mx-3"  onClick={handleSubmit}  ><i className="fas fa-trash"></i></button>
        
                    <button className="btn btn-info mb-1" onClick={() =>history.push("/modifyquestion/"+props.question._id) }> <i className="fas fa-edit"></i></button>
                </td>
            </tr>
        );
    
}

export default DataTableQuestion;