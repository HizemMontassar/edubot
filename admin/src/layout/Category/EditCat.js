import React, { useState, useEffect } from 'react'  
import axios from 'axios';  
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';  
function EditCat(props) {  
        const [category, setcategory]= useState({Id:'',Name: ''});  
        const Url = `/quiz/getcategory/${ props.match.params.id}` ;  
        
        useEffect(() => {  
          const GetData = async () => {  
            const result = await axios(Url);  
            setcategory(result.data);  
            
          };  
        
          GetData();  
        }, []);  
        
        const UpdateEmployee = (e) => {  
          e.preventDefault();  
          const data = { name:category.Name};  
          axios.put(`/quiz/updatecategory/${ props.match.params.id}`, data)  
            .then((result) => {  
              props.history.push('/ListCat')  
              window.location.reload();
            });  
           
        };  
        
        const onChange = (e) => {  
          e.persist();  
          setcategory({...category, [e.target.name]: e.target.value});  
        }  
        
        return (  
                <div className="app flex-row align-items-center">  
                <Container>  
                  <Row className="justify-content-center">  
                    <Col md="12" lg="10" xl="8">  
                      <Card className="mx-4">  
                        <CardBody className="p-4">  
                          <Form onSubmit={UpdateEmployee}>  
                            <h1>Edit Category</h1>  
                        
                            <InputGroup className="mb-3">  
            
                              <Input type="text" name="Name" id="Name" placeholder="Name" value={category.name} onChange={ onChange }  />  
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
  
export default EditCat