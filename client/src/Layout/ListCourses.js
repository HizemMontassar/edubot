import React from 'react'  

import {Link} from 'react-router-dom';
import {OverlayTrigger,Popover,Button,Tooltip} from 'react-bootstrap'
  
import axios from 'axios';  
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from 'react'  

function ListCourses(props) {  
 
  const [rate, setRate] = useState(0);

  const [data, setData] = useState([]);  
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [modalShow, setModalShow] = useState(false);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
 
  var local=localStorage.getItem('Data');
  if((local !== "undefined" ) &&(local !== null )){
    const decode=jwt_decode(local)
    var Username=decode.username
    var idu=decode._id

  }else{
 //  history.push("/");
 console.log('mat3adash')
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

        

  useEffect(() => {  

    const GetData = async () => {  
      axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
      const result = await axios(`/category/getuser/${idu}`);  

      setData(result.data);  

    };  

  

    GetData();  

  }, []); 
 
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      increment the course rating
    </Tooltip>
  );
 
 
     
  const renderData = (data) => {
    return (
      

      

      <>  
 
         {  

          data.map((item, idx) => {  
            const popover = (
              <Popover id="popover-basic">
                <Popover.Title as="h3">Course Details</Popover.Title>
                <Popover.Content>
              <div style={{ color: 'red',}}>Course name:</div>  {item.name}<br></br>
                <div style={{ color: 'red', }}>Link to :</div><Link  to={{ pathname: item.url }} target="_blank"onClick={() => {progress(item._id)}}>{item.url}</Link>
                <div style={{ color: 'red', }}> Progress :</div> <div className="font-weight-bold d-block"> <small>{item.progress}%</small> </div>
                <div style={{ color: 'red', }}>Rating :</div><div className="font-weight-bold d-block"> <small>{item.ratings}</small> </div>

                </Popover.Content>
              </Popover>
            );
           

            return < >  
           
            <div  className="col-md-3">
                <div className="card p-3">
                    <div className="text-center"> 
                    <img src="../images/card/udemy.jpg" className="card-img img-fluid" width="96" height="350" alt=""></img> 
                    </div>
               
                   
          
                    <div className="product-details"> <span className="font-weight-bold d-block">{item.name}</span> <span></span>
                    <span>
             
              
                    <Container onClick={() => { Update(item._id) }}>
                      
      {[...Array(3)].map((i, index) => {
        const givenRating = index + 1;
        return (
          <label >
             
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
                
              
                alert(`Are you sure you want to add ${givenRating} star ?`);
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < item.ratings || givenRating === item.ratings
                    ? "rgba(255, 100, 100, 0.85)"
                    : "rgb(192,192,192)"
                }
              />
             
            </Rating>
          
          </label>
         
        );
      })}
       <br></br>
       <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip}
  >
  <Link style={{fontStyle:'red',border:'none' , fontSize:'20px'}} onClick={() => { Update(item._id) ;
   alert(`Are you sure you want to add 1 star ?`);} } >+</Link>
 </OverlayTrigger>
    </Container></span>
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
    <Button variant="success" style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
             
            }}>see details</Button>
  </OverlayTrigger>
    {/* <Link to={`/detail/${item._id}`} onClick={() => {detail(item._id) }} className="text-warning" > <br /> View course</Link>
                        <div className="font-weight-bold d-block"> <small>{item.progress}%</small> </div> */}
                    </div>
                   
                    </div>
                </div>
          
            </>  

          })}   

      </>  

     
    );
  };

  
  const detail = (id) => {  

    debugger;  

    axios.get(`/category/getCourse/${id}`).then((result) => {  


    });  

     

  };  
 
  const validate = (id) => {  

    debugger;  
    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
    axios.put(`/category/validatecourse/${id}`).then((result) => {  
     //props.history.push('/course');

    });  

  }; 
  const progress = (id) => {  

    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')

    axios.put(`/category/progress/${id}`).then((result) => {  
    // props.history.push('/course');
    window.location.reload();

    });  

  }; 

 
  const ratee = (id) => {  
    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data') 

    axios.put(`/category/rate`).then((result) => {  
    // props.history.push('/course');
    window.location.reload();

    });  

  };
  const Update= (id) => {  
    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
   
    axios.put(`/category/rateadd/${id}`, data)  
      .then((result) => {  
        
        window.location.reload();
      });  
     
  };  
  


  return (  
  

      
    <section>
    
             <div style={{margin:'200px', width: '1000px' , height: '500px', display: 'flex',justifyContent: 'center',flexWrap:'wrap', alignItems: 'center'}}>{renderData(currentItems)}</div>
             
            
           
              
           

   
    </section>
    
   
   
  )  

}  

  
export default ListCourses