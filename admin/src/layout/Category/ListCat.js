import React from 'react'  

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table ,Button} from 'reactstrap';  

import axios from 'axios';  

import { useState, useEffect } from 'react'  

function ListCat(props) {  

  const [data, setData] = useState([]);  

  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
  

  useEffect(() => {  

    const GetData = async () => {  

      const result = await axios('/quiz/getallcat');  

      setData(result.data);  

    };  

  

    GetData();  

  }, []);  





  const deleteeployee = (id) => {  

    debugger;  

    axios.delete(`/quiz/deletecategory/${id}`)  

      .then((result) => {  

        props.history.push('/ListCat')  
        window.location.reload();

      });  

  };  
  const editemployee = (id) => {  

    props.history.push({  

      pathname: '/edit/' + id  

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

                   

                  <th>Name</th> 

                    <th>Action</th>


                 

                  </tr>  

                </thead>  

                <tbody>  

                  {  

                    data.map((item, idx) => {  

                      return <tr >  
                          
    

                        <td>{item.name}</td>  
                        <td>  

<div class="btn-group">  

  <button className="btn btn-info mb-1" onClick={() => { editemployee(item._id) }}><i className="fas fa-edit"></i></button>  

  <button className="btn btn-info mb-1" onClick={() => { deleteeployee(item._id) }}><i className="fas fa-trash"></i></button>  

</div>  

</td> 
                        


                      </tr>  

                    })}  

                </tbody>  

              </Table>  
              <Col xs="12" sm="6">  
                    <Button type="submit" className="btn btn-info mb-1" href='/AddCat' >Add new Category</Button>  
                  </Col>
            </CardBody>  

          </Card>  

        </Col>  

      </Row>  

    </div>  
    </div>  
  )  

}  

  
export default ListCat  