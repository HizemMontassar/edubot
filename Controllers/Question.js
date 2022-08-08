const question = require("../models/Question");
const quiz = require("../models/Quiz");

exports.getallqsts= (req, res, next) => {
    question.find(function(err,data){
        res.json(data);
    })};
// exports.addques= (req, res, next) => {
//     new question({question:req.body.question,rep1:req.body.rep1,rep2:req.body.rep2,rep3:req.body.rep3,repcorrecte:req.body.repcorrecte}).save();
//     res.send("added");
//     };

    exports.addques=(req,res)=> {
        new question({question:req.body.question,rep1:req.body.rep1,rep2:req.body.rep2,rep3:req.body.rep3,repcorrecte:req.body.repcorrecte}).save().then(function(dbquiz) {
           console.log(dbquiz);
         question.findOneAndUpdate({ _id: dbquiz._id },  {quiz: req.params.idquiz}, { new: true })
         .populate("quizzes")
          .then(function(dbques) {
            
            res.json(dbques);
          })
          .catch(function(err) {
            
            res.json(err);
          })
        })}
exports.affecterquizques=(req,res)=>{
        question.findById(req.params.idques)
            .then(function(dbquiz) {
                console.log(dbquiz);
              question.findOneAndUpdate({ _id: dbquiz._id }, {quiz: req.params.idquiz}, { new: true })
              .populate("quizzes")
               .then(function(dbques) {
                 
                 res.json(dbques);
               })
               .catch(function(err) {
               res.sendStatus(404);
                // res.json(err);
               })
             })
        }

        exports.dessaffecterquestionquiz=(req,res)=>{

            question.findById(req.params.idques)
            .then(function(dbquiz) {
                console.log(dbquiz);
              question.findOneAndUpdate({ _id: dbquiz._id }, {$unset: {quiz: req.params.idquiz}}, { new: true })
              .populate("quizzes")
               .then(function(dbques) {
                 
                 res.json(dbques);
               })
               .catch(function(err) {
               res.sendStatus(404);
                // res.json(err);
               })
             })
        }
        exports.deleteques=(req,res)=>{
            question.findByIdAndRemove(req.params.id,function(err,docs){
                if(err)
                res.sendStatus(404);
                //console.log(err);
                res.send("subcategory deleted");
            })}

        exports.updateques= (req, res, next) => {
            question.findByIdAndUpdate(req.params.id,{$set: req.body}, function (err, docs) {
                if (err) return  res.sendStatus(404);
                res.send('ques udpated.');
            })
        }

exports.getques= (req, res, next) => {
    question.findById(req.params.id,function(err,data){
        if (err)
        res.sendStatus(404);
        res.json(data);
    })}


    
