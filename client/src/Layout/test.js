import axios from 'axios';
import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import{ useState,useEffect } from 'react';


function ChartQuiz (){  

   
const [chartData,SetchartData] = useState({
       
      
        labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        
        datasets:[
          {
            label:'Users',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
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
;
  

 


    return (
      <div className="chart">
        <Bar
          data={chartData}
          options={{
         
          }}
        />

        
      </div>
    )
  }


export default ChartQuiz;