import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const DataTableSub = (props) => {
    const [test, setTest] = useState("")
    const history = useHistory();
console.log(props)

useEffect(() => {
   
axios.get('/quiz/getcategory/'+props.sub.category)
.then(res=>{setTest(res.data.name)})
.catch((err)=>console.log(err));

})
  const  handleSubmit = event => {
    event.preventDefault();
    window.location.reload();


    axios.delete(`/quiz/deletesub/${props.sub._id}`)
      .then(res => {
      
        console.log(res);
        console.log(res.data);
      })
  }


 
   
        
        return (
            <tr>
                
                <td>
                    {props.sub.name}
                </td>
          
                <td>
                    {test}
                </td>
                <td>
                    <button className="btn btn-info mb-1  " onClick={handleSubmit}  ><i className="fas fa-trash"></i></button>
                
                    <button className="btn btn-info mb-1  " onClick={() =>history.push("/editsub/"+props.sub._id) }> <i className="fas fa-edit"></i></button>
                    <button className="btn btn-info mb-1" onClick={() =>history.push("/showquizzes/"+props.sub._id) }>show quizzes</button>
                </td>
            </tr>
        );
    
}

export default DataTableSub;