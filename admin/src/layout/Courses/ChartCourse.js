import React, { useState, useEffect } from "react";
import { Line ,Bar,Pie,PolarArea,Bubble} from "react-chartjs-2";
import axios from "axios";

const Chartcourse = () => {
  const [chartData, setChartData] = useState({});
  const [chartDataa, setChartDataa] = useState({});
  const [chartDataaa, setChartDataaa] = useState({});
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);
  const chart2 = () => {
    let empSal = [];
    let empAge = [];
    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
    axios
      .get("/category/getallCourses")
      .then(res => {
        console.log(res);
       
        for (const dataObj of res.data) {
          var i=0;
          if (dataObj.validation)
          {   
            i++;
          }
          empSal.push(parseInt(i));
          empAge.push(dataObj.name);
        }
        setChartDataaa({
          labels: empAge,
          datasets: [
            {
              label: "valid courses",
              data: empSal,
              backgroundColor: [  "#3cb371",
              "#0000FF",
              "#9966FF",
              "#4C4CFF",
              "#00FFFF",
              "#f990a7",
              "#aad2ed",
              "#FF00FF",
              "Blue",
              "Red"

            ],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart2();
  }, []);

  const chart1 = () => {
    let empSal = [];
    let empAge = [];
    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
    axios
      .get("/category/getallCourses")
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          empSal.push(parseInt(dataObj.progress));
          empAge.push(dataObj.name.substring(0,15));
        }
        setChartDataa({
          labels: empAge,
          datasets: [
            {
              label: "Course progress",
              data: empSal,
              backgroundColor: [  "#3cb371",
              "#0000FF",
              "#9966FF",
              "#4C4CFF",
              "#00FFFF",
              "#f990a7",
              "#aad2ed",
              "#FF00FF",
              "Blue",
              "Red"

            ],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart1();
  }, []);

  const chart = () => {
    let empSal = [];
    let empAge = [];
    axios
      .get("/category/getallCourses")
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          empSal.push(parseInt(dataObj.progress));
          empAge.push(dataObj.name.substring(0,15));
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "Course progress",
              data: empSal,
              backgroundColor: [  "#3cb371",
              "#0000FF",
              "#9966FF",
              "#4C4CFF",
              "#00FFFF",
              "#f990a7",
              "#aad2ed",
              "#FF00FF",
              "Blue",
              "Red"

            ],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    
    
    <div className="App">
      <h1>course</h1>
      <div>
     <div class="col-xl-10 col-12 center">
    <div class="box">
      <div class="box-body">
        <h4 class="box-title">Bar Chart</h4>
        <div>
         <Pie
          data={chartDataa}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: false },
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
      </div>
    </div>
  </div>


    
  );
};

export default Chartcourse;