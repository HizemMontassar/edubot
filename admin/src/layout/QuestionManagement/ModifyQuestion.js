//import '../assets/dist/css/adminlte.min.css'
import React,  { useEffect,useState } from 'react'  
import axios from 'axios';
import ComboBox from 'react-responsive-combo-box'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory,useParams } from "react-router-dom";


export function ModifyQuestion (props) {  
  const history = useHistory();
  const { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [selected, setSelected] = useState();
  axios.defaults.headers.common['Authorization']='bearer '+localStorage.getItem('Data')
  useEffect(() => {
    
  
    async function getCharacters() {
      const response = await fetch("/quiz/getallquiz",{ headers: {'Authorization':'bearer '+localStorage.getItem('Data')}});
      const body = await response.json();
      console.log(body)
      setQuiz(body.map(({ title,_id }) => ({ label: title, value: _id })));
     //console.log(category[0].value)
     
    }
    getCharacters();


    axios.get('/quiz/getques/'+id)
    .then(ques=> {console.log(ques);formik.setValues({ question: ques.data.question, rep1: ques.data.rep1 , rep2:ques.data.rep2 , rep3:ques.data.rep3 ,repcorrecte:ques.data.repcorrecte,selected:ques.data.quiz });})
    .catch(function (error){console.log(error); })
    
  },[id]);

    


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
      if (selected===undefined  )
      {console.log(quiz[0].value)
        axios.put('/quiz/updateques/'+id,{ question: values.question, rep1: values.rep1 , rep2:values.rep2 , rep3:values.rep3 ,repcorrecte:values.repcorrecte,selected:values.quiz });
       axios.put('/quiz/affecterquesquiz/'+quiz[0].value+'/'+id,{ question: values.question, rep1: values.rep1 , rep2:values.rep2 , rep3:values.rep3 ,repcorrecte:values.repcorrecte,selected:values.quiz })}
     else  { 
       axios.put('/quiz/updateques/'+id,{ question: values.question, rep1: values.rep1 , rep2:values.rep2 , rep3:values.rep3 ,repcorrecte:values.repcorrecte,selected:values.quiz });
       axios.put('/quiz/affecterquesquiz/'+selected+'/'+id,{ question: values.question, rep1: values.rep1 , rep2:values.rep2 , rep3:values.rep3 ,repcorrecte:values.repcorrecte,selected:values.quiz })}
     
     // axios.put('http://localhost:83/quiz/updateques/'+id,values)
     history.push("/listquestions");
     window.location.reload();
    },
    }); 
    // const id = props.match.params.id;
    
    
    
    return (<>
   
   <section className="content-wrapper">
    <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
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
                <button type="submit" className="btn btn-primary">UPDATE</button>
                </div>
                <div className="card-footer">
                <button type="submit" className="btn btn-primary" onClick={() =>history.push("/listquestions") }>EXIT</button>
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


export default ModifyQuestion
