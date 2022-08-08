const PQuiz = require("../models/PersonalityQuiz");
const fetch = require('node-fetch');


exports.apiquiz=(req,res) =>{
    t=["https://opentdb.com/api.php?amount=20&category=21&type=multiple","https://opentdb.com/api.php?amount=20&category=17&type=multiple","https://opentdb.com/api.php?amount=20&category=19&type=multiple"]

    fetch(t[Math.floor(Math.random() * 4)], { method: 'GET'})
    .then((res) => {
        return res.json();
    })
    .then((json) => {
         for(let i=0;i<20 ;i++)   
         {  new PQuiz({category:json.results[i].category,difficulty:json.results[i].difficulty,question:json.results[i].question,correct_answer:json.results[i].correct_answer,rep1:json.results[i].incorrect_answers[0],rep2:json.results[i].incorrect_answers[1],rep3:json.results[i].incorrect_answers[2],rep4:json.results[i].correct_answer,repselected:null }).save();
          
         } 
       
         res.send(json);
       
        }).catch(err=>res.sendStatus(404));
       

}