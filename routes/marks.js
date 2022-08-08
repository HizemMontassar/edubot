const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();
const Mark = require("../models/Mark");
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const subcategory = require("../models/SubCategory");
/* Get all marks*/
router.get("/getAllMarks", function (req, res, next) {
  Mark.find({}).populate('user').populate('quiz').then((data,err) => {
    if (err) {
      console.log(err);
      res.status(500).send({message: 'Data Not found' })
    } else {
      console.log(data);
      res.status(200).send(data)
    }
  }
  )
});
router.get("/filterskillacquise/:iduser", async function (req, res, next) {

  
  Mark.find({type:"evaluation",user:req.params.iduser}, function(err,data){
    var  t=[] ;tt=[]
    data.map((v,i)=>{
      if(v.mark>75){//t.push(v ); 
        //console.log(v.quiz) ;
        t.push(v.quiz); //console.log(t)
        t.map((vv,i)=>{
            Quiz.findOne({_id:vv},function(err,dataa){
                  
               // console.log("333333"+dataa.subcategory)
                subcategory.findOne({_id:dataa.subcategory},function(err,dataaa){
                  
                 // console.log(dataaa.name)
                  t.push(dataaa.name)
                  console.log("yosra"+t)
                  //res.send(t)
                 
                })
                
                })
               
        }) 
        // t.map((y,in)=>{
        //   Quiz.find({_id:v.quiz},function(err,dataa){
        //     dataa.map()
        //   console.log("333333"+dataa)
        //   })

        // })
       
     // console.log("RRRRRRRRR"+tt)
      }
    })
    // console.log(t)
     res.send(t)
  })
});


router.get("/filterskillsdecouverte/:iduser", async function (req, res, next) {

  
  Mark.find({type:"personality",user:req.params.iduser},function(err,data){
     t=[]
    data.map((v,i)=>{
      if(v.mark>75){console.log(v.category); if (!t.includes(v.category)){t.push(v.category);}}
    })
    console.log(t)
    res.send(t)
  })
});

/* Get marks by user*/
router.get("/getMarksByUser", async function (req, res, next) {
  const {username} = req.body;
  const user = await User.findOne({username});
  const userid = user._id;
  console.log(userid);
  Mark.find({user:userid}, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({message: 'Data Not found' })
    } else {
      console.log(data);
      res.status(200).send(data)
    }
  });
});

/* add mark to user*/
router.post("/addMark", async function (req, res, next) {
  const {
    username,
    quizid,
    date,
    category,
    type,
    mark
  } = req.body;
  try {
    const user = await User.findOne({username});
    var c = await Quiz.find({});
    console.log(c);
    const quiz = await Quiz.findById(quizid).exec();
    console.log(quiz);
    const response = await Mark.create({
      user,
      quiz,
      category,
      type,
      date,
      mark
    });
    console.log(response);
    res.status(200).json({message: 'Mark added successfully' })
  } catch (error)
  {
    console.error(error);
    res.status(500).json({message: 'Error adding Mark' })
  }
});

/* Delete all user's marks */
router.delete("/deleteAllUsersMarks", async function (req, res, next) {
  const {username} = req.body;
  const user = await User.findOne({username});
  userid = user._id;
  Mark.deleteMany({user: userid}, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({message: 'No data found' })
    } else {
      res.status(200).send({message: ':Marks deleted successfully' })
    }
  });
});

/* Delete one mark */
router.delete("/deleteOneMark", async function (req, res, next) {
  const {markid} = req.body;
  Mark.findOneAndDelete({_id: markid}, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({message: 'No data found' })
    } else {
      res.status(200).json({message: 'Mark deleted successfully' })
    }
  });
});

module.exports = router;