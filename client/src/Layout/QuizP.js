//import '../assets/dist/css/quiz'

import React from 'react'  

export function QuizP (props) { 
 
  //console.log(props)
      return (
        <div className="container-fluid">
                <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                <h3>{props.question}</h3>
              </div>
              <div className="modal-body">
                <div className="col-xs-3 5"> </div>
                <div className="quiz" id="quiz" data-toggle="buttons">
                  <label className="element-animation1 btn btn-lg btn-success btn-block"><span className="btn-label"><i className="glyphicon glyphicon-chevron-right" /></span> 
                  <input type="radio" name="q_answer" defaultValue={1} /> {props.correct_answer}</label> <label   className="element-animation2 btn btn-lg btn-success btn-block"><span className="btn-label"><i className="glyphicon glyphicon-chevron-right" /></span> 
                  <input type="radio" name="q_answer" defaultValue={2} />{props.rep2}</label> <label className="element-animation3 btn btn-lg btn-success btn-block"><span className="btn-label"><i className="glyphicon glyphicon-chevron-right" /></span> 
                  <input type="radio" name="q_answer" defaultValue={3} />{props.rep3}</label> <label className="element-animation4 btn btn-lg btn-success btn-block"><span className="btn-label"><i className="glyphicon glyphicon-chevron-right" /></span> 
                  <input type="radio" name="q_answer" defaultValue={4} /> {props.rep4} </label> </div>
              </div>
           
            </div>
            </div>
            {props.index===19 && 
             
            <> <button>Submit</button> <button>Exit</button></> }

        
        
      
      </div>
      );
    }
    export default QuizP;
  