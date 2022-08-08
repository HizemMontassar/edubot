/* eslint-disable no-fallthrough */
import { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Line } from "react-chartjs-2";
// "chart.js": "^2.9.4",
function ListMarks() {
  const [marksList, setMarksList] = useState([]);
  const labels = ["January", "February", "March", "April", "May", "June"];
  const [chartData, SetchartData] = useState({});
  const chart = () => {
    var data = [0, 0, 0, 0, 0, 0];
    Axios.get("/marks/getAllMarks")
      .then((res) => {
        setMarksList(res.data);
        console.log(res.data);
        res.data.map((v, i) => {
          var dt = new Date(v.date);
          var dtm = dt.getMonth();
          console.log(dtm);
          switch (dtm) {
            case 0:
              data[0]++;
              break;
            case 1:
              data[1]++;
              break;
            case 2:
              data[2]++;
              break;
            case 3:
              data[3]++;
              break;
            case 4:
              data[4]++;
              break;
            case 5:
              data[5]++;
              break;
            default:
              data[6]++;
          }
        });
        SetchartData({
          labels: labels,
          datasets: [
            {
              label: "Number of quizzes taken by month",
              data: data,
              fill: true,
              backgroundColor: ["rgba(255, 99, 132, 0.6)"],
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  ///////////////////
  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Marks</h1>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class=" card chart-container">
            <Line data={chartData} options={options} />
          </div>
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">
                List of marks of all quizzes taken by users
              </h3>
            </div>
            <div>
              <div>
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th>Username</th>
                      <th>Quiz</th>
                      <th>Date</th>
                      <th>Mark</th>
                    </tr>
                  </thead>

                  <tbody>
                    {marksList.map((val, key) => {
                      if (val.user === null || val.quiz === null)
                        return (
                          <tr>
                            <td>user</td>
                            <td>quiz</td>
                            <td>{val.date}</td>
                            <td>{val.mark}</td>
                          </tr>
                        );
                      else
                        return (
                          <tr>
                            <td>{val.user.username}</td>
                            <td>{val.quiz.title}</td>
                            <td>{val.date}</td>
                            <td>{val.mark}</td>
                          </tr>
                        );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
  
}

export default ListMarks;
