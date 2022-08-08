const statquiz = require("../models/StatQuiz");

exports.addquiz= (req, res, next) => {
    console.log("helloo")
    console.log(req.body.subcategory)
    new statquiz({user_id:req.params.id,subcategory:req.body.subcategory}).save();
    res.send("added");
    };

exports.StatsQuizAdmin =  (req,res)=>{
  
        a=  statquiz.aggregate([
            { 
                $group: {
                    _id:"$subcategory" ,
                    count: { $sum: 1 }
                 }}
            
        ]).exec(function ( e, d ) {
            res.send(d);
          console.log( d )            
      })
        
       
       
      };


      
exports.StatsQuizUser =  (req,res)=>{
    console.log( req.params.id)
    a=  statquiz.aggregate([
         
            { $match: {
                user_id:req.params.id
            }}
            ,
            {$group: {
                _id:"$subcategory" ,
                count: { $sum: 1 }
             }}
         
        
    ]).exec(function ( e, d ) {
        console.log("hhhhhh")    
        console.log( d )  ; 
        res.send(d);
                
  })
    
   
   
  };