//import '../assets/dist/css/adminlte.min.css'
import React, { Component } from 'react'  
import axios from 'axios';
import { useFormik } from "formik";
import ComboBox from 'react-responsive-combo-box'
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import   { useEffect,useState } from 'react'  


export  function AddQuestion ()  {  
  const history = useHistory();
  const [quiz, setQuiz] = useState([]);
  const [selected, setSelected] = useState();
  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
  useEffect(() => {
    
   
    async function getCharacters() {
      const response = await fetch("/quiz/getallquiz",{ headers: {'Authorization':'bearer '+localStorage.getItem('Data')}});
      const body = await response.json();
      console.log(body)
      setQuiz(body.map(({ title,_id }) => ({ label: title, value: _id })));
     
    }
    getCharacters();
  },[]);

  const formik = useFormik({
     initialValues: {
     question: "",
      rep1: "",
      rep2: "",
      rep3:"",
      repcorrecte:"",
      quiz:quiz,
      selected:selected
    },
 
    
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      console.log("hello");
    console.log(selected);
      axios.post('/quiz/addques/'+selected,values)
     history.push("/listquestions"); window.location.reload();
    },
    }); 

    return (<>
   
   <section className="content-wrapper">
     
    <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9">
                <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Add Question</h3>
              </div>
              <form onSubmit={formik.handleSubmit} >
                <div className="card-body">
                  <div className="form-group">
                    <label >Question</label>
                    <input type="text" className="form-control" id="questioninput" name="question" value={formik.values.question}  onChange={formik.handleChange}  placeholder="Enter the question"/>
                  </div>
                  <div className="form-group">
                    <label >Response 1</label>
                    <input type="text" className="form-control" id="rep1input" name="rep1" onChange={formik.handleChange} value={formik.values.rep1} placeholder="Enter the first response" />
                  </div>
                  <div className="form-group">
                    <label >Response 2</label>
                    <input type="text" className="form-control" id="rep2input" name="rep2" onChange={formik.handleChange} value={formik.values.rep2} placeholder="Enter the second response" />
                  </div>
                  <div className="form-group">
                    <label >Response 3</label>
                    <input type="text" className="form-control" id="rep3input" name="rep3" onChange={formik.handleChange} value={formik.values.rep3} placeholder="Enter the last response"/>
                  </div>
                  <div className="form-group">
                    <label >The answer</label>
                    <input type="text" className="form-control" id="answerinput" name="repcorrecte" onChange={formik.handleChange} value={formik.values.repcorrecte} placeholder="Enter the answer" />
                  </div>
                  
                  <div className="form-group">
                  
                  <label >The Quiz Title</label>
                  <select onChange={e => setSelected(e.currentTarget.value)} >
                    <option> </option>
                    {quiz.map(({ label, value }) => 
                  (<option key={value} value={value} >
                    {label}  
                    </option> ))}
                  </select>
                
                </div>
                </div>

                <div className="card-footer">
                <button type="submit" className="btn btn-info mb-1 mx-4">ADD</button>
               
                <button type="submit" className="btn btn-info mb-1" onClick={() =>history.push("/listquestions") }>EXIT</button>
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
      question: Yup.string()
      .required("Champs requis!"),
      rep1: Yup.string()
      .required("Champs requis!"),
      rep2: Yup.string()
      .required("Champs requis!"),
      rep3: Yup.string()
      .required("Champs requis!"),
      repcorrecte: Yup.string()
      .required("Champs requis!"),
     
      });

export default AddQuestion
