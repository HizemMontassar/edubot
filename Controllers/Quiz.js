const quiz = require("../models/Quiz");
const question = require("../models/Question");
const subcategory = require("../models/SubCategory");

exports.getallquizzes= (req, res, next) => {
    quiz.find(function(err,data){
        res.json(data);
    })};
exports.addquiz= (req, res, next) => {
    new quiz({title:req.body.title,level:req.body.level}).save();
    res.send("added");
    };

    exports.filterquiz=(req,res,next)=>{
  
      console.log(req.params.name)
       subcategory.findOne({name:req.params.name},function(err,data){
         
           t=[]
           quiz.find({subcategory:data.id,level:req.params.level},function(err,data){
             data.map((resp)=>{t.push(resp);})
             qz=t[Math.floor(Math.random() * t.length)]
             console.log(qz._id)
             tques=[]
             question.find({quiz:qz._id},function(err,data){
               tques=data;
               //console.log(data);
              //  data.map((resp)=>{tques.push(resp)})
                //console.log(tques);
                res.send(tques)
             })
            
          
            })
         })
           
        

    }
    exports.filtersubquiz=(req,res,next)=>{
  
      //console.log(req.params.name)
       subcategory.findOne({_id:req.params.id},function(err,data){
         
           t=[]
           quiz.find({subcategory:data.id},function(err,dataa){
             dataa.map((resp)=>{t.push(resp);
             
            })
             console.log(t)
          // res.send(t)
          res.send(t)  
          
            })
         })
           
        
    }
    exports.filterquesquiz=(req,res,next)=>{
  
     // console.log(req.params.name)
       quiz.findOne({_id:req.params.id},function(err,data){
         
           t=[]
           question.find({quiz:data.id},function(err,dataa){
             dataa.map((resp)=>{t.push(resp);
             
            })
             console.log(t)
          // res.send(t)
          res.send(t)  
          
            })
         })
           
        
    }

   
  
    exports.addquizz=(req,res)=> {
        new quiz({level:req.body.level,title:req.body.title}).save().then(function(dbsubcat) {
           console.log(dbsubcat);
         quiz.findOneAndUpdate({ _id: dbsubcat._id },  {subcategory: req.params.idsubcat}, { new: true })
         .populate("subcats")
          .then(function(dbquiz) {
            
            res.json(dbquiz);
          })
          .catch(function(err) {
            
            res.json(err);
          })
        })}



        exports.dessaffectersubcatquiz=(req,res)=>{
            quiz.findById(req.params.idquiz)
            .then(function(dbsubcat) {
                console.log(dbsubcat);
              quiz.findOneAndUpdate({ _id: dbsubcat._id }, {$unset: {subcategory: req.params.idsubcat}}, { new: true })
              .populate("subcats")
               .then(function(dbquiz) {
                 
                 res.json(dbquiz);
               })
               .catch(function(err) {
               res.sendStatus(404);
                // res.json(err);
               })
             })
        }


        exports.updatequiz= (req, res, next) => {
            quiz.findByIdAndUpdate(req.params.id,{$set: req.body}, function (err, docs) {
                if (err) return  res.sendStatus(404);
                res.send('quiz udpated.');
            })
        }


        exports.affectersubcatquiz=(req,res)=>{
          quiz.findById(req.params.idquiz)
              .then(function(dbsubcat) {
                  console.log(dbsubcat);
                quiz.findOneAndUpdate({ _id: dbsubcat._id }, {subcategory: req.params.idsubcat}, { new: true })
                .populate("subcats")
                 .then(function(dbquiz) {
                   
                   res.json(dbquiz);
                 })
                 .catch(function(err) {
                 res.sendStatus(404);
                  // res.json(err);
                 })
               })
          }




exports.deletequizz= (req, res, next) => {
    quiz.findByIdAndRemove(req.params.id,function(err,docs){
        if(err)
        res.sendStatus(404);
        //console.log(err);
        res.send("quizz deleted");
    })
    };
    


exports.getquiz= (req, res, next) => {
    quiz.findById(req.params.id,function(err,data){
        if (err)
        res.sendStatus(404);
        res.json(data);
    })}