import React, { useState, useEffect } from 'react'  
import axios from 'axios';  
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';  
function AddCat(props) {  
  const [category, setcategory] = useState({ Name: '' });  
  const [showLoading, setShowLoading] = useState(false);  
  const apiUrl = "/quiz/addcategory";  
  
  const Insertcat = (c) => {  
    c.preventDefault();  
    debugger;  
    const data = { name:category.Name };  
    axios.post(apiUrl, data)  
      .then((result) => {  
        props.history.push('/ListCat')  
        window.location.reload();
      });  
  };  
  const onChange = (c) => {  
    c.persist();  
    debugger;  
    setcategory({...category, [c.target.name]: c.target.value});  
  }  
  
  return (  
    <div className="app flex-row align-items-center">  
      <Container>  
        <Row className="justify-content-center">  
          <Col md="12" lg="10" xl="8">  
            <Card className="mx-4">  
              <CardBody className="p-4">  
                <Form onSubmit={Insertcat}>  
                  <h1>Add category</h1>  
                  <InputGroup className="mb-3">  
  
                    <Input type="text" name="Name" id="Name" placeholder="Name" value={category.name} onChange={ onChange }  />  
                  </InputGroup>  
                   <InputGroup className="mb-3">  
  
                   
  
                   
  
                     
   
                  </InputGroup>
                      
             <CardFooter className="p-4">  
                <Row>  
                  <Col xs="12" sm="6">  
                    <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>  
                  </Col>  
                  <Col xs="12" sm="6">  
                    <Button className="btn btn-info mb-1" block><span>Cancel</span></Button>  
                  </Col>  
                </Row>  
              </CardFooter>  
                </Form>  
              </CardBody>  
            </Card>  
          </Col>  
        </Row>  
      </Container>  
    </div>  
  )  
}  
export default AddCat  