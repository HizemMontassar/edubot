import axios from 'axios';
import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import{ useState,useEffect } from 'react';


function ChartQuiz (){  

   
const [chartData,SetchartData] = useState({})
    
  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')   

const chart = () => {
  let cat=[];
  let nombre=[];
  axios.get("/quiz/statquizadmin/").then((res)=>{
    console.log(res);
    for (const dataObj of res.data) {
      cat.push((dataObj._id));
      console.log(dataObj.count)
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
        <div>
      <div>
      <div className="chart">
      <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "the most visited sub categories Quizzes", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />

        
      </div>
      </div>
      </div>
    )
  }


export default ChartQuiz;