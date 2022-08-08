import React from 'react'  

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,Button } from 'reactstrap';  

import axios from 'axios';  

import { useState, useEffect } from 'react'  
import DataTableSub from './DataTableSub';

function ListSub(props) {  

  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
  const [data, setData] = useState([]);  
  const [test, setTest] = useState("")
  

  useEffect(() => {  

    const GetData = async () => {  

      const result = await axios('/quiz/getallsub');  

      setData(result.data);  
    
      

    };  



    GetData();  



  }, []);  





  const deleteeployee = (id) => {  

    debugger;  

    axios.delete(`/category/deletesub/${id}`)  

      .then((result) => {  

        props.history.push('/ListSub')  
        window.location.reload();

      });  

  };  
  const editemployee = (id) => {  

    props.history.push({  

      pathname: '/editsub/' + id  

    });  

  };  

  

  return (  
    <div class="content-wrapper">
    <div className="animated fadeIn">  

      <Row>  

        <Col>  

          <Card>  

            <CardHeader>  

              <i className="fa fa-align-justify"></i> category List  

              </CardHeader>  

            <CardBody>  

              <Table hover bordered striped responsive size="sm">  

                <thead>  

                  <tr>  

                   

                  <th>Subcategory Name</th> 
                  <th>category</th>

                    <th>Action</th>
                    

                 

                  </tr>  

                </thead>  

                <tbody>  

                {data?.map((sub,key)=>(<DataTableSub sub={sub} ></DataTableSub>))}

                </tbody>  

              </Table>  
              <Col xs="12" sm="6">  
                    <Button type="submit" className="btn btn-info mb-1" href='/AddSub' >Add new SubCategory</Button>  
                  </Col>
            </CardBody>  

          </Card>  

        </Col>  

      </Row>  

    </div>  
    </div>  
  )  

}  

  
export default ListSub 