import React, { useState, useEffect } from "react";
import { Line ,Bar,Pie,PolarArea,Bubble} from "react-chartjs-2";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Chartcourse = () => {
  const [chartData, setChartData] = useState({});
  const [data, setData] = useState([]); 
  const [employeeSalary, setEmployeeSalary] = useState([]);
  const [employeeAge, setEmployeeAge] = useState([]);
  var local=localStorage.getItem('Data');
  if((local !== "undefined" ) &&(local !== null )){
    const decode=jwt_decode(local)
    var Username=decode.username
    var id=decode._id

  }else{
 //  history.push("/");
 console.log('mat3adash')
 //history.push('/')

  }
  useEffect(() => {  

    const GetData = async () => {  
      axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
      const result = await axios(`/category/getuser/${id}`);  

      setData(result.data);  

    };  

  

    GetData();  

  }, []); 

  const chart = () => {
   
    let empSal = [];
    let empAge = [];
    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
    axios
      .get(`/category/getuser/${id}`)
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

    <div class="col-xl-6 col-12">
    <div class="box">
      <div class="box-body">
        <h4 class="box-title">Bar Chart</h4>
        <div>
        <div className="App">
      <h1>Courses Chart</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: true
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: true
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