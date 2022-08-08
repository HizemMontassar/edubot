//import '../assets/dist/css/adminlte.min.css'
import React, { Component } from 'react'  
import axios from 'axios';
import { useFormik } from "formik";
import ComboBox from 'react-responsive-combo-box'
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import   { useEffect,useState } from 'react'  


export  function AddQuiz ()  {  
  const history = useHistory();
  const [subcategory, setsubCategory] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedlevel, setSelectedlevel] = useState();
  
  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
  useEffect(() => {
    
    async function getCharacters() {
      const response = await fetch("/quiz/getallsub",{ headers: {'Authorization':'bearer '+localStorage.getItem('Data')}});
      const body = await response.json();
      console.log(body)
      setsubCategory(body.map(({ name,_id }) => ({ label: name, value: _id })));
     
    }
    getCharacters();
  },[]);

  const formik = useFormik({
     initialValues: {
     title: "",
     level: ['easy','medium','hard'],
      subcategory:subcategory,
      selected:selected,
      selectedlevel:selectedlevel
    },
  
    
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      console.log("hello");
      console.log(selected);
    axios.post('/quiz/addquizz/'+selected,{level:values.selectedlevel,subcategory:values.selected,title:values.title})
   
     history.push("/listquiz"); window.location.reload();
    },
    }); 

    return (<>
   
   <section className="content-wrapper">
     
    <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9">
                <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Add Quizz</h3>
              </div>
              <form onSubmit={formik.handleSubmit} >
                <div className="card-body">
                  <div className="form-group">
                    <label >title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formik.values.title}  onChange={formik.handleChange}  placeholder="Enter the title"/>
                  </div>
                 
                  <div className="form-group">
                  
                  <label >Level</label>
                    <ComboBox options={formik.values.level} name="selectedlevel" onChange={formik.handleChange} value={formik.values.selectedlevel} onSelect={setSelectedlevel} enableAutocomplete />
                </div>

                  <div className="form-group">
                  
                  <label >The Sub-Category name</label>
                  <select onChange={e => setSelected(e.currentTarget.value)} >
                  <option> </option>
                    {subcategory.map(({ label, value }) => 
                  (<option key={value} value={value} >
                    {label}  
                    </option> ))}
                  </select>
                </div>
                
                </div>

                <div className="card-footer">
                <button type="submit" className="btn btn-info mb-1 mx-4">ADD</button>
              
                <button type="submit" className="btn btn-info mb-1" onClick={() =>history.push("/listquiz") }>EXIT</button>
                </div>
                
              </form>
            </div>
            </div>   
                </div>
            </div> 
</section>   
    
  </>  )
    }
    const yupSchema = Yup.object({
      title: Yup.string()
      .required("Champs requis!"),
     
      });

export default AddQuiz
