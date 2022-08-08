
import React, { Component } from 'react'  
import axios from 'axios';
import { useFormik } from "formik";
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import   { useEffect,useState } from 'react'  


export  function AddSub ()  {  
  const history = useHistory();
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState();

  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
  useEffect(() => {
    
    async function getCharacters() {
      const response = await fetch("/quiz/getallcat",{ headers: {'Authorization':'bearer '+localStorage.getItem('Data')}});
      const body = await response.json();
      console.log(body)
      setCategory(body.map(({ name,_id }) => ({ label: name, value: _id })));
     
    }
    getCharacters();
  },[]);

  const formik = useFormik({
     initialValues: {
     name: "",
      category:category,
      selected:selected,
   
    },
  
    
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      console.log("hello");
      console.log(selected);
    axios.post('/quiz/addsub/'+selected,{category:values.selected,name:values.name})
   
     history.push("/ListSub");
     window.location.reload();
    },
    }); 

    return (<>
   
   <div className="app flex-row align-items-center">  
      <Container>  
      <Row className="justify-content-center">  
          <Col md="12" lg="10" xl="8">  
            <Card className="mx-4">  
              <CardBody className="p-4">  
              <h1>Add Sub-category</h1>
              <Form onSubmit={formik.handleSubmit} >
                <div className="card-body">
                  <div className="form-group">
                    <label >name</label>
                    <Input type="text" className="form-control" id="name" name="name" value={formik.values.name}  onChange={formik.handleChange}  placeholder="Enter the name "/>
                  </div>
                 
                 

                  <div className="form-group">
                  
                  <label >The Category name</label>
                  <select onChange={e => setSelected(e.currentTarget.value)} >
                    {category.map(({ label, value }) => 
                  (<option key={value} value={value} >
                    {label}  
                    </option> ))}
                  </select>
                </div>
                
                </div>

                <CardFooter className="p-4">  
                <Row>  
                  <Col xs="12" sm="6">  
                <Button type="submit" className="btn btn-info mb-1" block>Save</Button>
                </Col>  
                  <Col xs="12" sm="6"> 
                <Button type="submit" className="btn btn-info mb-1" block onClick={() =>history.push("/ListSub") }>Cancel</Button>
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
    
  </>  )
    }
    const yupSchema = Yup.object({
      name: Yup.string()
      .min(3, "Minimum 3 caractéres")
      .max(80, "Maximum 80 caractéres")
      .required("Champs requis!"),
     
      });

export default AddSub
