import React from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover, Button, Tooltip } from "react-bootstrap";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useHistory,useParams } from "react-router-dom";

function TimeLine(props) {
  const [rate, setRate] = useState(0);

  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [modalShow, setModalShow] = useState(false);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  var local = localStorage.getItem("Data");
  if (local !== "undefined" && local !== null) {
    const decode = jwt_decode(local);
    var Username = decode.username;
    var idu = decode._id;
  } else {
    //  history.push("/");
    console.log("mat3adash");
    //history.push('/')
  }

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data;

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const { id } = useParams();
	const [cat, setcat] = useState([]);

  useEffect(() => {
    let t=[];
		console.log("TYYYYTTT"+id)
			axios.get('/marks/filterskillsdecouverte/'+id)
			.then(res=>{console.log(res.data);
				setcat(res.data);
				console.log("UUU");
				console.log(cat);
				cat.map((v,i)=>{console.log(v);})
			  
			})
			.catch(function (error){console.log(error);
			})
    const GetData = async () => {
      axios.defaults.headers.common["Authorization"] =
        "bearer " + localStorage.getItem("Data");
      const result = await axios(`/category/getuser/${idu}`);

      setData(result.data);
    };
    
    GetData();
  }, []);


  const progress = (id) => {
    axios.defaults.headers.common["Authorization"] =
      "bearer " + localStorage.getItem("Data");

    axios.put(`/category/progress/${id}`).then((result) => {
      // props.history.push('/course');
      window.location.reload();
    });
  };

  const renderData = (data) => {
    return (
      <>
        <section class="content">
          <div class="row">
            <div class="col-lg-50 connectedSortable">
              <div class="box box-solid box-primary">
                <div class="box-header with-border">
                  <h4 class="box-title">Courses progress</h4>

                  <ul className="box-controls pull-right">
                    <li>
                      <a className="box-btn-close" href="#"></a>
                    </li>
                    <li>
                      <a className="box-btn-slide" href="#"></a>
                    </li>
                    <li>
                      <a className="box-btn-fullscreen" href="#"></a>
                    </li>
                  </ul>
                </div>
                <div class="box-body p-0">
                  <ul class="todo-list">
                    {data.map((item, idx) => {
                      const popover = (
                        <Popover id="popover-basic" style={{ color: "red" }}>
                          <Popover.Title as="h3">Course Details</Popover.Title>
                          <Popover.Content>
                            <div style={{ color: "red" }}>Course name:</div>{" "}
                            {item.name}
                            <br></br>
                            <div style={{ color: "red" }}>Link to :</div>
                            <Link
                              to={{ pathname: item.url }}
                              target="_blank"
                              onClick={() => {
                                progress(item._id);
                              }}
                            >
                              {item.url}
                            </Link>
                            <div style={{ color: "red" }}> Progress :</div>{" "}
                            <div className="font-weight-bold d-block">
                              {" "}
                              <small>{item.progress}%</small>{" "}
                            </div>
                            <div style={{ color: "red" }}>Rating :</div>
                            <div className="font-weight-bold d-block">
                              {" "}
                              <small>{item.ratings}</small>{" "}
                            </div>
                          </Popover.Content>
                        </Popover>
                      );
                      return (
                        <>
                          <li>
                            <label
                              for="basic_checkbox_13"
                              class="mb-0 h-15 ml-15"
                            ></label>

                            <span class="text-line">{item.name} </span>
                            <OverlayTrigger
                              style={{ color: "red" }}
                              trigger="click"
                              placement="right"
                              overlay={popover}
                            >
                              <small class="badge bg-danger">
                                progress: {item.progress}%
                              </small>
                            </OverlayTrigger>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="box box-solid box-primary">
            <div class="box-header with-border">
              <h4 class="box-title">Discovered Skills </h4>

              <ul class="box-controls pull-right">
                <li>
                  <a class="box-btn-close" href="#"></a>
                </li>
                <li>
                  <a class="box-btn-slide" href="#"></a>
                </li>
                <li>
                  <a class="box-btn-fullscreen" href="#"></a>
                </li>
              </ul>
            </div>
            <div class="box-body p-0">
              <ul class="todo-list">
                <li>
                  <input
                    type="checkbox"
                    id="basic_checkbox_13"
                    class="filled-in"
                  />
                  <div>
                    {cat.map((v, i) => (
                      <div>
                        {" "}
                        <span class="text-line">{v}</span>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <section>
      <div
        style={{
          margin: "200px",
          width: "1000px",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {renderData(currentItems)}
      </div>
    </section>
  );
}

export default TimeLine;
