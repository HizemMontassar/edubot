//import '../assets/dist/css/adminlte.min.css'
import React, { Component } from 'react'  
import axios from 'axios';
import { useFormik } from "formik";
import ComboBox from 'react-responsive-combo-box'
import * as Yup from "yup";
import { useHistory,useParams } from "react-router-dom";
import   { useEffect,useState } from 'react'  


export  function ModifyQuiz ()  {  
  const history = useHistory();
  const { id } = useParams();
  
  const [level,setLevel]=useState(['easy','medium','hard'])
  const [subcategory, setsubCategory] = useState([]);
  const [selected, setSelected] = useState();
  const [selectedlevel, setSelectedlevel] = useState();

  
  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')

  useEffect(() => {
    
  
    async function getCharacters() {
      const response = await fetch("/quiz/getallsub",{ headers: {'Authorization':'bearer '+localStorage.getItem('Data')}});
      const body = await response.json();
      //console.log(body)
      setsubCategory(body.map(({ name,_id }) => ({ label: name, value: _id })));
     //console.log(category[0].value)
     
    }
    getCharacters();


    axios.get('/quiz/getquiz/'+id)
    .then(ques=> {formik.setValues({ title: ques.data.title, level: ques.data.level ,selectedlevel:'easy', subcategory:ques.data.subcategory  });})
    .catch(function (error){console.log(error); })
    
  },[id]);

  const formik = useFormik({
     initialValues: {
     title: "",
     level:level,
      subcategory:subcategory,
      selected:selected,
      selectedlevel:selectedlevel
    },
  
    
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      console.log("hello");
      console.log(selected);
      console.log(selectedlevel);
      //axios.put('/quiz/affectersubcatquiz/'+selected+'/'+id,{title:values.title,level:selectedlevel,title:values.title,subcategory:selected})
      
        if (selected===undefined  )
      {console.log(subcategory[0].value)
        axios.put('/quiz/updatequiz/'+id,{level:selectedlevel,title:values.title});
       axios.put('/quiz/affectersubcatquiz/'+subcategory[0].value+'/'+id,{level:selectedlevel,title:values.title,subcategory:selected})}
     else  { 
       axios.put('/quiz/updatequiz/'+id,{level:selectedlevel,title:values.title});
       axios.put('/quiz/affectersubcatquiz/'+selected+'/'+id,{level:selectedlevel,title:values.title,subcategory:selected})}
     if(!selectedlevel)
       {
        axios.put('/quiz/updatequiz/'+id,{level:level[0],title:values.title});
       }
      history.push("/listquiz");
      window.location.reload();
    },
    }); 

    return (<>
   
   <section className="content-wrapper">
     
    <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Modify Quiz</h3>
              </div>
              <form onSubmit={formik.handleSubmit} >
                <div className="card-body">
                  <div className="form-group">
                    <label >title</label>
                    <input type="text" className="form-control" id="title" name="title" value={formik.values.title}  onChange={formik.handleChange}  placeholder="Enter the title"/>
                  </div>
                 
                  <div className="form-group">
                  
                  <label >Level</label>
                  <select onChange={e => setSelectedlevel(e.currentTarget.value)} >
                    {level.map((value) => 
                  (<option value={value} >
                    {value}  
                    </option> ))}
                  </select>
                </div>

                  <div className="form-group">
                  
                  <label >The sub-Category name</label>
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
                <button type="submit" className="btn btn-primary">UPDATE</button>
                </div>
                <div className="card-footer">
                <button type="submit" className="btn btn-primary" onClick={() =>history.push("/listquiz") }>EXIT</button>
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

export default ModifyQuiz
