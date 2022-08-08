import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../_actions/message_actions";
import Message from "./Sections/Message";
import QuizP from "./QuizP";
import { List, Icon, Avatar, Table, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactTinyLink } from "react-tiny-link";
import {toast} from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css'
import jwt_decode from "jwt-decode";
const axios = require("axios");
toast.configure();

function Chat() {
  axios.defaults.headers.common["authorization"] =
    "bearer " + localStorage.getItem("Data");
  const dispatch = useDispatch();
  const messagesFromRedux = useSelector((state) => state.message.messages);
  const [radioquiz, setradioquiz] = useState([]);
  const [radioquizP, setradioquizP] = useState([]);
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [Notee, setNote] = useState(false);

  var local=localStorage.getItem("Data")
  if (local !== "undefined" && local !== null) {
  const decode = jwt_decode(local);
  var username = decode.username;
  var id = decode._id;
  }
  const textQuery = async (text) => {
    let conversation = {
      who: "user",
      message: text,
    };
    dispatch(saveMessage(conversation));
    console.log("text i send" + conversation.message);
    ////////////response of the chatbot

    const textQueryVariables = {
      message: text,
      username: username,
      userid: id,
    };
    //console.log(textQueryVariables)
    try {
      const response = await axios.post(
        "/dialogflow/chatbot",
        textQueryVariables
      );

      if (typeof response.data.token === "undefined") {
        localStorage.getItem("Data");
      } else {
        localStorage.setItem("Data", response.data.token);
        response.data.token = "undefined";
      }

      const t = [];
      var content = "";
      //console.log(response)

      if (response.data.message.length >= 2) {
        response.data.message.map((v, k) => {
          //console.log(v)
          if (v.message === "text") {
            //console.log(response.data.message[0].text.text[0]);
            //console.log("PPPPPPPPP"+ typeof v.message)
            content = response.data.message[0].text.text[0];
          } else if (v.message === "payload") {
            response.data.message[1].payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.options.listValue.values.map(
              (v, i) => {
                t.push(v.structValue.fields.text.stringValue);
              }
            );
            //console.log(t);
          } else {
            //la reponse est un tableau de string ex! IT art
            if (typeof v === "string") {
              console.log("hhhhhhhh");
              t.push(v);
            } else {
              //la reponse tableau de JSON >2
              console.log("iiiiiiiiiiiiiiii");
              t.push(JSON.stringify(v));
            }
          }
        });
      } else {
        if (response.data.message[0].message === "payload") {
          //console.log("TYPEEE"+typeof response.data.message)
          response.data.message[0].payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.options.listValue.values.map(
            (v, i) => {
              t.push(v.structValue.fields.text.stringValue);
            }
          );
          console.log("TAAAAAAAAZZ");
        } else if (response.data.message[0].message === "text") {
          content = response.data.message[0].text.text[0];
          console.log("TAAZZ");
        } else {
          if (response.data.message.results === "object") {
            //la reponse st un string  ex:react
            response.data.message.results.map((v, i) => {
              t.push(JSON.stringify(v));
            });
            console.log("YYYYYYYYYYY");
          } else {
            //la reponse est un message qui ccontient un tableau de results sus forme JSON (reponse api)
            console.log("MMMMMMMM");
            t.push(response.data.message[0]);
          }
        }
      }
      console.log(response);

      console.log("tttttt" + t);
      console.log("rahma " + content);

      let conversation = {
        who: "chatbot",
        message: [content, t],
      };
      //console.log("conv:" + conversation.text)

      dispatch(saveMessage(conversation));
      console.log("response chatbot:" + conversation.text);
    } catch (err) {
      conversation = {
        message: [
          {
            platform: "PLATFORM_UNSPECIFIED",
            text: {
              text: "FAILLLED",
            },
          },
        ],
      };
    }
  };

  const addJobToUser = () => {
    axios.post("/jobs/addJob", {
      salary: Math.floor(Math.random() * 1000),
      country: "Germany",
      starting_date: "2010-09-03",
      ending_date: "2015-09-03",
      position: "Developer",
      contract: "",
      type: "work",
      username: username,
    });
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      textQuery(e.target.value);
      e.target.value = "";
    }
  };

  const calculernotequiz=(yoss,radioquiz)=>
{	var note=0;
	let quizzz=JSON.parse(yoss[0])
	console.log(yoss.length)
	let quizid=quizzz.quiz;
console.log(JSON.parse(yoss[0]).quiz)

console.log(radioquiz)
yoss.map((t,i)=>{console.log(JSON.parse(t));
	let a=JSON.parse(t);
	console.log(a)
	if(a.repcorrecte===radioquiz[i]){
		console.log(radioquiz[i]);
		console.log(t.repcorrecte);
		note =note+1;
	}
})

console.log("eeeeeeeeeeee");
note=(note*100)/yoss.length
console.log(note);
setNote(note);
let quizidd=JSON.parse(yoss[0]).quiz;
console.log(quizidd)

 axios.post('/marks/addMark',{mark:note,quizid:quizidd,type:"evaluation",username:username})
 
 if(note>60)
 {toast('Congratuations! your mark:'+note)}
else
 {toast('you have to work hard, your mark:'+note)}
textQuery("quizzes")
return note

}

const calculernotequizP=(yb,radioquizP)=>
{	var note=0;
//console.log(JSON.parse(yoss[0]))
console.log("eeeeeeeeeeee");
console.log(radioquizP)
let quizzz=JSON.parse(yb[0])

let nomcategory=quizzz.category

yb.map((t,i)=>{
	//console.log(JSON.parse(t));
	let a=JSON.parse(t);
	//console.log(a)
	if(a.correct_answer===radioquizP[i]){
		//console.log(radioquizP[i]);
		//console.log(t.correct_answer);
		note =note+1;
	}
})
console.log(nomcategory)
note=note*100/20;
axios.post('/marks/addMark',{mark:note,type:"personality",category:nomcategory,username:username})
console.log(note);

if(note>60)
{toast('Congratuations! your mark:'+note)}
else
{ 
//    if(nomcategory==="Art")
//   { 
//     axios.get('http://localhost:5000/category/apiudemy/Arts%20&%20Crafts').then((res)=>{
//     res.data.map((w,k)=>{toast(w);})  
//   console.log(res.data)})
// }
if(nomcategory==="Science: Mathematics")
{ 
  axios.get('/category/apiudemy/Math').then((res)=>{
  res.data.map((w,k)=>{toast(w, {
    // Set to 15sec
    position: toast.POSITION.BOTTOM_LEFT, autoClose:5000});})  
console.log(res.data)})
}
if(nomcategory==="sports")
{ 
  axios.get('/category/apiudemy/Sports').then((res)=>{
  res.data.map((w,k)=>{toast(w, {
    // Set to 15sec
    position: toast.POSITION.BOTTOM_LEFT, autoClose:5000});})  
console.log(res.data)})
}
if(nomcategory==="Science & Nature")
{ 
  axios.get('/category/apiudemy/Science').then((res)=>{
  res.data.map((w,k)=>{toast(w, {
    // Set to 15sec
    position: toast.POSITION.BOTTOM_LEFT, autoClose:5000});})  
console.log(res.data)})
}
//   axios.get('https://www.udemy.com/api-2.0/courses/?subcategory=Arts%20&%20Crafts', {'Authorization': 'Basic aDdhblB1NzAzOTBYM0VRM0xueWl5UGhNcUFRT2c5NXYyQnRHSDBYaDo0ak12ejNmRHc4Ymh5Mnhhdk1hSUEya25QUlFtS004ODRLQ0dHMmFMYThvSVF3TTRobUhJcFB2VFlsRW9QYlJaY0tmOXBVb21ubjVLSTd3UGJxREFVejBQTTJmN0k3WVlKaUpoN0FUWTRNUVhQYzhUbkhwTDQyYXJ3VFAyVVlnSg=='})
// .then((res)=>{console.log("hello");console.log(res)})
  toast('Maybe you should test another quizz:'+note)
  toast.error('RECOMMANDATION', {
    // Set to 15sec
    position: toast.POSITION.BOTTOM_LEFT, autoClose:5000})
 }
textQuery("quizzes")
return note;

}

  const renderOneMessageUser = (message, i) => {
    console.log("message", message);

    // we need to give some condition here to separate message kinds

    // template for normal text
    if (message) {
      //return <Message key={i} who={message.who} text={message.message} />;
      return (
        <div>
          <div class="clearfix"></div>
          <div class="card d-inline-block mb-3 float-right mr-2 bg-primary max-w-p80">
            <div class="position-absolute pt-1 pr-2 r-0">
              <span class="text-extra-small">
                {new Date().toLocaleString()}
              </span>
            </div>
            <div class="card-body">
              <div class="d-flex flex-row pb-2">
                <a class="d-flex" href="#">
                  <img
                    alt="Profile"
                    src="../images/avatar/2.jpg"
                    class="avatar mr-10"
                  />
                </a>
                <div class="d-flex flex-grow-1 min-width-zero">
                  <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                    <div class="min-width-zero">
                      <p class="mb-0 font-size-16">You</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chat-text-left pl-55">
                <Message key={i} who={message.who} text={message.message} />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      );
    } else if (message.content && message.content.payload.fields.card) {
    }
  };

  const renderOneMessageBot = (message, i) => {
    console.log("message", message);

    // we need to give some condition here to separate message kinds

    // template for normal text
    if (message) {
      console.log("rrrrrrrrrrr" + JSON.stringify(message.message));
      //return <Message key={i} who={message.who} text={message.message} />;
      return (
        <div>
          <div class="clearfix"></div>
          <div class="card d-inline-block mb-3 float-left mr-2 no-shadow bg-lighter max-w-p80">
            <div class="position-absolute pt-1 pr-2 r-0">
              <span class="text-extra-small text-muted">
                {new Date().toLocaleString()}
              </span>
            </div>
            <div class="card-body">
              <div class="d-flex flex-row pb-2">
                <a class="d-flex" href="#">
                  <img
                    alt="Profile"
                    src="../images/avatar/1.jpg"
                    class="avatar mr-10"
                  />
                </a>
                <div class="d-flex flex-grow-1 min-width-zero">
                  <div class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between">
                    <div class="min-width-zero">
                      <p class="mb-0 font-size-16 text-dark">Edubot</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chat-text-left pl-55">
                <Message key={i} who={message.who} text={message.message[0]} />

                {message.message[1].map((v, i) => {
                  // console.log(message.message[1].length)
                  if (v.includes("CVlink")) {
                    //console.log(message)
                    return (
                      <>  
                        <ReactTinyLink
                          cardSize="small"
                          showGraphic={true}
                          maxLine={2}
                          minLine={1}
                          url={"https://edubot-webandits.herokuapp.com/cv"}
                        />
                      </>
                    );
                  }

                  if (v.includes("adzuna")) {
                    //console.log(message)
                    return (
                      <>
                        <ReactTinyLink
                          cardSize="small"
                          showGraphic={true}
                          maxLine={2}
                          minLine={1}
                          url={v}
                          onClick={addJobToUser}
                        />
                      </>
                    );
                  }

                  if (v.includes("udemy")) {
                    //console.log(message)
                    return (
                      <>
                        <a class="one" target="_blank" href="default.asp">
                          <ReactTinyLink
                            to={{ pathname: v }}
                            cardSize="small"
                            showGraphic={true}
                            autoPlay={true}
                            maxLine={2}
                            minLine={1}
                            url={v}
                          />
                        </a>
                        <br></br>
                      </>
                    );
                  }

                  if (v.includes("category", "difficulty", "correct_answer")) {
                    var z = JSON.parse(v);
                    console.log(z);
                    console.log("JSOOON");
                    return (
                      <>
                        <div className="container-fluid shadow p-3 mb-5 bg-body rounded">
                          <div className="modal-dialog ">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h3>
                                  Q{i + 1}: {z.question}
                                </h3>
                              </div>
                              <div className="modal-body">
                                <div className="col-xs-3 5"> </div>
                                <div
                                  className="quiz"
                                  id="quiz"
                                  data-toggle="buttons"
                                >
                                  <label className="element-animation1 btn btn-lg btn-success btn-block">
                                    <span className="btn-label">
                                      <i className="glyphicon glyphicon-chevron-right" />
                                    </span>
                                    <input
                                      type="radio"
                                      name="q_answer"
                                      defaultValue={1}
                                      onClick={(e) => {
                                        radioquizP.splice(
                                          i,
                                          1,
                                          z.correct_answer
                                        );
                                        setradioquiz(radioquizP);
                                      }}
                                    />{" "}
                                    {z.correct_answer}
                                  </label>{" "}
                                  <label className="element-animation2 btn btn-lg btn-success btn-block">
                                    <span className="btn-label">
                                      <i className="glyphicon glyphicon-chevron-right" />
                                    </span>
                                    <input
                                      type="radio"
                                      name="q_answer"
                                      defaultValue={2}
                                      onClick={(e) => {
                                        radioquizP.splice(
                                          i,
                                          1,
                                          z.incorrect_answers[0]
                                        );
                                        setradioquiz(radioquizP);
                                      }}
                                    />
                                    {z.incorrect_answers[0]}
                                  </label>{" "}
                                  <label className="element-animation3 btn btn-lg btn-success btn-block">
                                    <span className="btn-label">
                                      <i className="glyphicon glyphicon-chevron-right" />
                                    </span>
                                    <input
                                      type="radio"
                                      name="q_answer"
                                      defaultValue={3}
                                      onClick={(e) => {
                                        radioquizP.splice(
                                          i,
                                          1,
                                          z.incorrect_answers[1]
                                        );
                                        setradioquiz(radioquizP);
                                      }}
                                    />
                                    {z.incorrect_answers[1]}
                                  </label>{" "}
                                  <label className="element-animation4 btn btn-lg btn-success btn-block">
                                    <span className="btn-label">
                                      <i className="glyphicon glyphicon-chevron-right" />
                                    </span>
                                    <input
                                      type="radio"
                                      name="q_answer"
                                      defaultValue={4}
                                      onClick={(e) => {
                                        radioquizP.splice(
                                          i,
                                          1,
                                          z.incorrect_answers[2]
                                        );
                                        setradioquiz(radioquizP);
                                        console.log(radioquizP);
                                      }}
                                    />{" "}
                                    {z.incorrect_answers[2]}{" "}
                                  </label>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          {i === 19 && (
                            <>
                              {" "}
                              <button
                                class="btn btn-success shadow p-3 mb-5 bg-body rounded"
                                onClick={() => {
                                  calculernotequizP(
                                    message.message[1],
                                    radioquizP
                                  );
                                  setModalIsOpen(true);
                                }}
                              >
                                Submit
                              </button>
                              <button
                                onClick={() => {
                                  textQuery("quizzes");
                                }}
                                class="btn btn-dark shadow p-3 mb-5 bg-body rounded"
                              >
                                Exit
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    );
                  } else if (v.includes("rep1", "rep2", "rep3")) {
                    var yos = JSON.parse(v);

                    radioquiz.push("0");

                    return (
                      <>
                        {" "}
                        <div className="container-fluid shadow p-3 mb-5 bg-body rounded ">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h3>
                                  Q{i + 1}: {yos.question}
                                </h3>
                              </div>
                              <div className="modal-body">
                                <div className="col-xs-3 5"> </div>
                                <div
                                  className="quiz"
                                  id="quiz"
                                  data-toggle="buttons"
                                >
                                  <label className="element-animation1 btn btn-lg btn-success btn-block">
                                    <span className="btn-label">
                                      <i className="glyphicon glyphicon-chevron-right" />
                                    </span>
                                    <input
                                      type="radio"
                                      checked={radioquiz[i] === "1"}
                                      onClick={(e) => {
                                        radioquiz.splice(i, 1, yos.rep1);
                                        setradioquiz(radioquiz);
                                      }}
                                      name="q_answer"
                                      defaultValue={yos.rep1}
                                    />{" "}
                                    {yos.rep1}
                                  </label>{" "}
                                  <label className="element-animation2 btn btn-lg btn-success btn-block">
                                    <span className="btn-label">
                                      <i className="glyphicon glyphicon-chevron-right" />
                                    </span>
                                    <input
                                      type="radio"
                                      checked={radioquiz[i] === "2"}
                                      onClick={(e) => {
                                        radioquiz.splice(i, 1, yos.rep2);
                                        setradioquiz(radioquiz);
                                      }}
                                      name="q_answer"
                                      defaultValue={yos.rep2}
                                    />
                                    {yos.rep2}
                                  </label>{" "}
                                  <label className="element-animation3 btn btn-lg btn-success btn-block">
                                    <span className="btn-label">
                                      <i className="glyphicon glyphicon-chevron-right" />
                                    </span>
                                    <input
                                      type="radio"
                                      checked={radioquiz[i] === "3"}
                                      onClick={(e) => {
                                        radioquiz.splice(i, 1, yos.rep3);
                                        setradioquiz(radioquiz);
                                        console.log(radioquiz);
                                      }}
                                      name="q_answer"
                                      defaultValue={yos.rep3}
                                    />
                                    {yos.rep3}
                                  </label>{" "}
                                </div>
                              </div>
                            </div>
                          </div>

                          {i === message.message[1].length - 1 && (
                            <>
                              {" "}
                              <button
                                class="btn btn-success shadow p-3 mb-5 bg-body rounded"
                                onClick={() =>
                                  calculernotequiz(
                                    message.message[1],
                                    radioquiz
                                  )
                                }
                              >
                                Submit
                              </button>{" "}
                              <button
                                class="btn btn-dark shadow p-3 mb-5 bg-body rounded"
                                onClick={() => {
                                  textQuery("quizzes");
                                }}
                              >
                                Exit
                              </button>{" "}
                            </>
                          )}
                        </div>
                      </>
                    );
                  } else {
                    console.log(v);
                    return (
                      <button
                        class="btn btn-light mx-2 my-1 shadow-lg p-3 mb-5 bg-body rounded"
                        onClick={() => {
                          textQuery(v);
                        }}
                      >
                        {v}
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (message.content && message.content.payload.fields.card) {
      console.log("---------------------------");
    }
  };

  const renderMessage = (returnedMessages) => {
    console.log("MMMMMM" + JSON.stringify(returnedMessages));
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        if (message.who === "user") return renderOneMessageUser(message, i);
        else if (message.who === "chatbot")
          return renderOneMessageBot(message, i);
      });
    } else {
      return null;
    }
  };

  return (
    <div>
      <div class="content-wrapper ">
        <div class="container-full">
          <section class="content ">
            <div class="row">
              <div class="col-lg-3 col-12">
                <div class="box bg-lightest" id="chat-bx"></div>
              </div>
              <div class="col-lg-9 col-12">
                <div class="row">
                  <div class="col-lg-8 col-12">
                    <div class="box shadow-lg p-3 mb-5 bg-body rounded ">
                      <div class="box-header">
                        <div class="media align-items-top p-0 ">
                          <a
                            class="avatar avatar-lg status-success mx-0"
                            href="/profile"
                          >
                            <img
                              src="../images/avatar/2.jpg"
                              class="rounded-circle"
                              alt="..."
                            />
                          </a>
                          <div class="d-lg-flex d-block justify-content-between align-items-center w-p100 ">
                            <div class="media-body mb-lg-0 mb-20 ">
                              <p class="font-size-16">
                                <a class="hover-primary" href="#">
                                  <strong>Edubot</strong>
                                </a>
                              </p>
                              <p class="font-size-12">
                                {new Date().toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="box-body mb-30">
                        <div class="chat-box-one">
                          <div class="clearfix"></div>
                          <div class="card d-inline-block mb-3 float-right mr-2 bg-primary max-w-p80">
                            <div class="position-absolute pt-1 pr-2 r-0">
                              <span class="text-extra-small"></span>
                            </div>
                          </div>
                          <div class="clearfix"></div>
                          {renderMessage(messagesFromRedux)}
                          <div class="clearfix"></div>
                        </div>
                      </div>
                      <div class="box-footer">
                        <div class="d-md-flex d-block justify-content-between align-items-center">
                          <input
                            class="form-control b-0 py-10"
                            type="text"
                            placeholder="Say something..."
                            onKeyPress={keyPressHandler}
                          />

                          <div class="d-flex justify-content-between align-items-center mt-md-0 mt-30">
                            <button
                              type="button"
                              class="waves-effect waves-circle btn btn-circle mr-10 btn-outline-secondary"
                            >
                              <i class="mdi mdi-image"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div class="control-sidebar-bg"></div>
    </div>
  );
}
export default Chat;