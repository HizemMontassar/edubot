
import React,  { useEffect,useState } from 'react'  
import axios from 'axios';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';  
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory,useParams } from "react-router-dom";


export function EditSub (props) {  
  const history = useHistory();
  const { id } = useParams();
  const [category, setcategory] = useState([]);
  const [selected, setSelected] = useState();
  
  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
  useEffect(() => {
    
  
    async function getCharacters() {
      const response = await fetch("/quiz/getallcat",{ headers: {'Authorization':'bearer '+localStorage.getItem('Data')}});
      const body = await response.json();
      console.log(body)
      setcategory(body.map(({ name,_id }) => ({ label: name, value: _id })));
     //console.log(category[0].value)
     
    }
    getCharacters();


    axios.get('/quiz/getsub/'+id)
    .then(sub=> {console.log(sub);formik.setValues({ name: sub.data.name,selected:sub.data.category });})
    .catch(function (error){console.log(error); })
    
  },[id]);




  const formik = useFormik({
     initialValues: {
     name: "",
 
      
      category:category,
      selected:selected,
    },

    validationSchema: yupSchema,


    onSubmit: async (values) => {
      console.log("hello");
      if (selected===undefined  )
      {console.log(category[0].value)
        axios.put('/quiz/updatesub/'+id,{ name: values.name,selected:values.category });
       axios.put('/quiz/affcatsub/'+id+'/'+category[0].value,{ name: values.name,selected:values.category })}
     else  { 
       axios.put('/quiz/updatesub/'+id,{ name: values.name,selected:values.category });
       axios.put('/quiz/affcatsub/'+id+'/'+selected,{ name: values.name,selected:values.category })}
     
    
     history.push("/ListSub");
     window.location.reload();
    },
    }); 
  
    
    
    
    return (<>
   
   <section className="content-wrapper">
    <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                <div className="card card-primary">
             
                <h1>Edit Subcategory</h1>
             
              <Form onSubmit={formik.handleSubmit} >
                <div className="card-body">
                  <div className="form-group">
                    <label >name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formik.values.name}  onChange={formik.handleChange}  placeholder="Enter the name"/>
                  </div>
               
                
                  <div className="form-group">
                  
                  <label >The category name</label>
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
                <Button type="submit" className="btn btn-info mb-1" block>UPDATE</Button>
                </Col>
                <Col xs="12" sm="6">
                <Button type="submit" className="btn btn-info mb-1" onClick={() =>history.push("/ListSub") }block>EXIT</Button>
                </Col>
                </Row>
                </CardFooter>
              </Form>
            </div>
            </div>   
                </div>
            </div> 
</section> 
  </>  )
    }
    const yupSchema = Yup.object({
      name: Yup.string()
      .min(3, "Minimum 3 caractéres")
      .max(80, "Maximum 80 caractéres")
      .required("Champs requis!"),
     
      });


export default EditSub
