const bodyParser = require("body-parser");
const talkToChatbot = require("./Chatbot");
var express = require("express");
const axios = require("axios");
const isAuth = require("../middleware/auth");
const { ConversationProfilesClient } = require("@google-cloud/dialogflow");
const { token } = require("morgan");
var router = express.Router();
tablogin = [];
tabregister = [];
tabquiz = [];
tabquiz2 = [];
tabquiz3 = [];
var infos = new Array();
tabregister = [];
var event = new Array();
var workexperience = new Array();
var educationalexperience = new Array();
var aquiredSkills = new Array();
var hobbies = new Array();
// acces awios wham
// bot ta3na
const baseUrl = "https://edubot-webandits.herokuapp.com";
//const baseUrl = "http://localhost:5000";

async function bot(req, res) {
  try {
    const [yosra, quizp, category, rahma] = await Promise.all([
      getValue1Async(req, res),
      getValue2Async(req, res),
      getValue3Async(req, res),
    ]);
    //YOSRA
 if (yosra.intent.displayName === "domain_quizzes - Personality") {
  console.log(quizp)
  res.send({ message: (quizp) })
}
if (yosra.intent.displayName === "domain_quizzes - evaluation"||yosra.intent.displayName === "domain" ) {
  console.log(category)
  res.send({ message: (category) })
}
if (yosra.intent.displayName === "domain_quizzes - evaluation - category") {
  tabquiz.push(yosra.queryText);
  const resp = await axios.get(baseUrl+'/quiz/getcatofsub/'+tabquiz[0]);
  res.send({ message:resp.data })
}
if (yosra.intent.displayName === "domain_quizzes - evaluation - category - level") {
  tabquiz.push(yosra.queryText);
  // const resp2 = await axios.post('/quiz/statquiz',{subcategory:tabquiz[1]});
  const resp2 = await axios.post(baseUrl+'/quiz/statquiz/'+req.body.userid,{subcategory:tabquiz[1]});
}
if (yosra.intent.displayName === "level") {
  tabquiz3.push(yosra.queryText);
  console.log(tabquiz3)

  const resp = await axios.get(baseUrl+'/quiz/getquizlevel/'+tabquiz3[1]+'/'+tabquiz3[2]);
// tabquiz3=[];
  res.send({ message:resp.data })
 
}
if (yosra.intent.displayName === "domain_quizzes - evaluation - category - level - custom") {
  tabquiz.push(yosra.queryText);
  console.log("eeeeeeee"+tabquiz[1])
  
  const resp = await axios.get(baseUrl+'/quiz/getquizlevel/'+tabquiz[1]+'/'+tabquiz[2]);
  
 // tabquiz=[];
  
  res.send({ message:resp.data })
 
}
if (yosra.intent.displayName === "courses_list") {
  tabquiz2.push(yosra.queryText);
  //const resp2 = await axios.post('/quiz/statquiz',{subcategory:tabquiz2[0]});
  const resp2 = await axios.post(baseUrl+'/quiz/statquiz/'+req.body.userid,{subcategory:tabquiz2[0]});
  console.log("aaaaa"+tabquiz2[0])

}
if (yosra.intent.displayName === "courses_list - quiz - custom") {
  tabquiz2.push(yosra.queryText);
  const resp = await axios.get(baseUrl+'/quiz/getquizlevel/'+tabquiz2[0]+'/'+tabquiz2[1]);
//tabquiz2=[];
  res.send({ message:resp.data })
}
if (yosra.intent.displayName === "domain - category") {
  tabquiz3.push(yosra.queryText);
  const resp = await axios.get(baseUrl+'/quiz/getcatofsub/'+tabquiz3[0]);

  res.send({ message:resp.data })
}
if (yosra.intent.displayName === "domain - category - courses/quiz") {
  tabquiz3.push(yosra.queryText);
 // const resp2 = await axios.post('/quiz/statquiz',{subcategory:tabquiz3[1]});
 const resp2 = await axios.post(baseUrl+'/quiz/statquiz/'+req.body.userid,{subcategory:tabquiz3[1]});

}
if (yosra.intent.displayName === "domain - category - courses/quiz - level - custom") {
  tabquiz3.push(yosra.queryText);
  
  const resp = await axios.get(baseUrl+'/quiz/getquizlevel/'+tabquiz3[1]+'/'+tabquiz3[2]);
// tabquiz3=[];
  res.send({ message:resp.data})
 
}





    //JASSEM
    if (
      (yosra.intent.displayName == "choice.REGISTER - fn" ||
        yosra.intent.displayName == "choice.REGISTER - fn - lastname" ||
        yosra.intent.displayName ==
          "choice.REGISTER - firstname - lastname - username" ||
        yosra.intent.displayName ==
          "choice.REGISTER - firstname - lastname - username - email" ||
        yosra.intent.displayName ==
          "choice.REGISTER - firstname - lastname - username - email - p") &&
      yosra.queryText != "hi"
    ) {
      tabregister.push(yosra.queryText);
    }
    if (
      tabregister.length == 5 &&
      yosra.intent.displayName ==
        "choice.REGISTER - firstname - lastname - username - email - p"
    ) {
      resp = await axios.post(baseUrl+"/user/register", {
        firstname: tabregister[0],
        lastname: tabregister[1],
        username: tabregister[2],
        email: tabregister[3],
        password: tabregister[4],
      });
      if (resp.data.data !== "undefined") {
        var tokenregister;

        tokenregister = resp.data.data;
        //   .then((res,req)=>{console.log(req);console.log('data register',res.data.data); tokenregister=res.data.data;}
        // )
        console.log("token", tokenregister);
        console.log(tabregister);
        res.send({ message: yosra.fulfillmentMessages, token: tokenregister });
      } else {
        resp.data.data = "undefined";
      }
      // res.send({message:resp.data})
    }

    //Marwen
    if (
      yosra.intent.displayName == "Search_job_info_title" ||
      yosra.intent.displayName == "Search_job_info_title_location"
    ) {
      infos.push(yosra.queryText);
      console.log("1---------", infos);
    }

    if (
      infos.length >= 2 &&
      yosra.intent.displayName == "Search_job_info_title_location"
    ) {
      const r = await axios.post(baseUrl+"/jobs/getjobslistings", {
        search: infos[0],
        location: infos[1],
      });
      let jobs = [];
      r.data.results.map((v, i) => {
        console.log("ggggg");
        jobs.push(v.redirect_url);
      });
      console.log(jobs);
      console.log("---------", infos);
      res.send({ message: jobs });
    }
    //workExperience
    if (yosra.intent.displayName == "CV_generation - workexperience") {
      workexperience.push(yosra.queryText);
    }
    if (
      workexperience.length >= 1 &&
      yosra.intent.displayName == "CV_generation - workexperience"
    ) {
      username = req.body.username;
      console.log(username);
      const r = await axios.post(baseUrl+"/user/experience", {
        experience: workexperience[0],
        username: username,
      });
    }
    //Education
    if (
      yosra.intent.displayName ==
      "CV_generation - workexperience - educationcareer"
    ) {
      educationalexperience.push(yosra.queryText);
    }
    if (
      educationalexperience.length >= 1 &&
      yosra.intent.displayName ==
        "CV_generation - workexperience - educationcareer"
    ) {
      username = req.body.username;
      const r = await axios.post(baseUrl+"/user/education", {
        education: educationalexperience[0],
        username: username,
      });
    }
    //AcquiredSkills
    if (
      yosra.intent.displayName ==
      "CV_generation - workexperience - educationcareer - skills"
    ) {
      aquiredSkills.push(yosra.queryText);
    }

    if (
      aquiredSkills.length >= 1 &&
      yosra.intent.displayName ==
        "CV_generation - workexperience - educationcareer - skills"
    ) {
      username = req.body.username;
      const r = await axios.post(baseUrl+"/user/aquiredskills", {
        aquiredskills: aquiredSkills[0],
        username: username,
      });
    }
    // Hobbies
    if (
      yosra.intent.displayName ==
      "CV_generation - workexperience - educationcareer - skills - hobbies"
    ) {
      hobbies.push(yosra.queryText);
    }

    if (
      hobbies.length >= 1 &&
      yosra.intent.displayName ==
        "CV_generation - workexperience - educationcareer - skills - hobbies"
    ) {
      username = req.body.username;
      const r = await axios.post(baseUrl+"/user/hobbies", {
        hobbies: hobbies[0],
        username: username,
      });
      res.send({ message: ["CVlink"] });
    }

    //MONTASSAR
    if (yosra.intent.displayName == "eventType") {
      event.splice(0, event.length);
      event.push(yosra.queryText);
      console.log(event);
      console.log("");
    }
    if (yosra.intent.displayName == "eventStartingDate") {
      event.push(yosra.queryText);
      console.log(event);
    }
    if (yosra.intent.displayName == "eventEndingDate") {
      console.log("helloooooo");
      event.push(yosra.queryText);
    }
    if (yosra.intent.displayName == "eventName") {
      event.push(yosra.queryText);
      console.log(event);
    }
    if (yosra.intent.displayName == "eventDescription") {
      event.push(yosra.queryText);
      console.log(event);
      const test = await axios.post(baseUrl+"/events/addUser/", {
        idUser: req.body.userid,
        startingDate: event[1] + "T00:00:00.000Z",
        endingDate: event[2] + "T00:00:00.000Z",
        eventType: event[0],
        eventName: event[3],
        description: event[4],
      });
      console.log(test);
      
    }

    //RAHMA
    if (
      (yosra.intent.displayName == "domain_courses_cn" ||
        yosra.intent.displayName == "domain_courses - cn - lg" ||
        yosra.intent.displayName == "domain_courses - cn - lg - duration") &&
      yosra.queryText != "hi"
    ) {
      tablogin.push(yosra.queryText);
    }
    if (yosra.intent.displayName === "domain_courses - cn - lg - duration") {
      const resp = await axios.get(baseUrl+
        "/category/apiudemy/" +
          tablogin[0] +
          "/" +
          tablogin[1] +
          "/" +
          tablogin[2]
      );

      res.send({ message: resp.data });
    }

    console.log(tabquiz3);
    //console.log(tokenregister);
    res.send({ message: yosra.fulfillmentMessages, token: tokenregister });
  } catch {
    console.log(tabquiz3);
    console.log("Problemeeee ");
  }
}
// 2 promise !! 2 fetch  =>
// bot
async function getValue1Async(req, res) {
  try {
    console.log("TAZ");
    const yosra = await talkToChatbot(req.body.message);
    return yosra;
  } catch {
    console.log("problem");
  }
}
// response api
async function getValue2Async(req, res) {
  try {
    ttt = [];
    const resp = await axios.get(baseUrl+"/quiz/apiquiz");
    // resp.data.message.results.map((v,i)=>{t.push(v)})
    resp.data.results.map((v, k) => {
      ttt.push(v);
    });

    return ttt;
  } catch {
    console.log("problem");
  }
}
//affich des categories
async function getValue3Async(req, res) {
  try {
    const resp = await axios.get(baseUrl+"/quiz/getallcatname");
    return resp.data;
  } catch {
    console.log("problem");
  }
}

router.post("/chatbot", bot);
module.exports = router;
