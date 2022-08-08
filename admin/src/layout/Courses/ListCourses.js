import React from 'react'  
import "./style.css";
import {Link} from 'react-router-dom';

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';  

import axios from 'axios';  

import { useState, useEffect } from 'react'  

function ListCourses(props) {  

  const [data, setData] = useState([]);  
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [test, setTest] = useState("");
  // const [search, setSearch] = useState("");
  // const [filteredCountries, setFilteredCountries] = useState([]);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
      const result = await axios('/category/getallcourses');  

      setData(result.data);  

    };  

  

    GetData();  

  }, []); 
 
  // useEffect(() => {
  //   setFilteredCountries(
  //   data.filter((course) =>
  //       course.name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search, data]);
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 6);
  }; 


  const renderData = (data) => {
    return (
      

      <Table hover bordered striped responsive size="sm">  
 
      <thead>  

        <tr>  

         

        <th>Course name</th> 
        <th>Url</th>
        <th>Language</th>
        <th>Duration</th>
        <th>progress </th>
        <th>State </th>
          <th>Action</th>


       

        </tr>  

      </thead>  

      <tbody>  

         {  

          data.map((item, idx) => {  

            return <tr >  
                


              <td>{item.name}</td> 
             
              <td><a><Link to={{ pathname: item.url }} target="_blank">{item.url}</Link></a></td> 
              <td>{item.language}</td>  
              <td>{item.Duration}</td>  
              <td>{item.progress}%</td>  
             
              <td>  {(() => {
              if (item.validation ){
                  return (
                      <a>valide</a>
                  )
              }
              
              return (
                <a>invalide</a>
            );
            })()}</td>
            

              
               
              
             
              <td>  
           
<div class="btn-group">  



<button className="btn btn-info mb-1" onClick={() => { deleteeployee(item._id) }}><i className="fas fa-trash"></i></button>  

</div>
<div class="btn-group">  



<button className="btn btn-info mb-1" onClick={() => { validate(item._id) }}><i className="fas fa-check"></i></button>  

</div>  

</td> 

              


            </tr>  

          })}   

      </tbody>  

    </Table>   

        
    );
  };


  const deleteeployee = (id) => {  
    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
    axios.delete(`/category/deletecourse/${id}`)  

      .then((result) => {  

        props.history.push('/ListCourses')  
        window.location.reload();

      });  

  };  
  const validate = (id) => {  

    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data') 

    axios.put(`/category/validatecourse/${id}`).then((result) => {  
     props.history.push('/ListCourses');
     window.location.reload();

    });  

  }; 
  const progress = (id) => {  

    axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')

    axios.put(`/category/progress/${id}`).then((result) => {  
     props.history.push('/ListCourses');
     window.location.reload();

    });  

  }; 


  

  return (  
      
    <div class="content-wrapper">
    <div className="animated fadeIn">  
   

      <Row>  

        <Col>  

          <Card>  

            <CardHeader>  

              <i className="fa fa-align-justify"></i> courses list  
             
              </CardHeader>  
              {renderData(currentItems)}
            <CardBody>  
           
              <Table hover bordered striped responsive size="sm">  

                <thead>  

                  {/* <tr>  

                   

                  <th>Course name</th> 
                  <th>Url</th>
                  <th>language</th>
                    <th>Action</th>


                 

                  </tr>   */}

                </thead>  

                <tbody>  

                  {/* {  

                    data.map((item, idx) => {  

                      return <tr >  
                          
    

                        <td>{item.name}</td>  
                        <td>{item.url}</td> 
                        <td>{item.language}</td>  
                        
                       
                        <td>  
                     
<div class="btn-group">  



  <button className="btn btn-info mb-1" onClick={() => { deleteeployee(item._id) }}><i className="fas fa-trash"></i></button>  

</div>  

</td> 

                        


                      </tr>  

                    })}   */}

                </tbody>  

              </Table>  

            </CardBody>  

          </Card>  

        </Col>  

      </Row>  
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        
        </li> 
      
      </ul>
      <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button>
 
    </div>  
   
    </div> 
   
  )  

}  

  
export default ListCourses