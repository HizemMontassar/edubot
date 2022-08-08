import axios from 'axios';
import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import{ useState,useEffect } from 'react';
import { useHistory,useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

function ChartQuizUser (){  

    const { id } = useParams();
    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')	

const [chartData,SetchartData] = useState({})

var local=localStorage.getItem('Data');
if((local !== "undefined" ) &&(local !== null )){
  const decode=jwt_decode(local)
  var Username=decode.username
  var iduser=decode._id
console.log("idusssserr"+iduser);
}else{
//  history.push("/");
console.log('mat3adash')
//history.push('/')

}     

const chart = () => {
  let cat=[];
  let nombre=[];
  console.log("RRRRRRRRRRRR"+iduser)
  axios.get("/quiz/statquizuser/"+iduser).then((res)=>{
    console.log(res);
    for (const dataObj of res.data) {
      cat.push((dataObj._id));
      nombre.push((dataObj.count))
    }

SetchartData({
  labels: cat,
        
  datasets:[
    {
      label:'Users',
      data:nombre,
      backgroundColor:[
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ]
    }
  ]
})
}).catch(err => {
  console.log(err);
});
console.log(cat);
};
useEffect(() => {
  chart();
}, []);

 

 


    return (
      <div >
      <div className="chart" >
        <Pie
          data={chartData}
          options={{
            
         
          }}
        />
        

        
      </div>
      </div>
    )
  }


export default ChartQuizUser;