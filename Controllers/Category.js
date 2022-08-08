const category = require("../models/Category");


exports.getallcategories= (req, res, next) => {
    category.find(function(err,data){
        res.json(data);
    })};

    
exports.getallcategoriesname= (req, res, next) => {
    t=[]
    category.find(function(err,data){
        data.map((resp)=>t.push(resp.name))
        //t.push(data.name);
        res.send(t);
    })};

exports.getcategory=(req,res,next)=>{
        category.findById(req.params.id,function(err,data){
            if(err)
            res.sendStatus(404);
            res.json(data);})
}


exports.filtercatid=(req,res,next)=>{
    console.log(req.params.name)
   category.findOne({name:req.params.name},function(err,data){
       console.log(data.id)
       res.send(data.id);})
}



exports.addcategoryn= (req, res, next) => {
    new category({name:req.body.name}).save();
    res.send("category added");
    };

// exports.addcategory=(req,res)=> {
//         new category({name:req.body.name}).save().then(function(dbquiz) {
//            console.log(dbquiz);
//          category.findOneAndUpdate({ _id: dbquiz._id },  {quiz:req.params.idquiz}, { new: true })
//          .populate("quizzes")
//           .then(function(dbcat) {
            
//             res.json(dbcat);
//           })
//           .catch(function(err) {
            
//             res.json(err);
//           })
//         })}
    // exports.affecterquizcat=(req,res)=>{
    //     category.findById(req.params.idcat)
    //         .then(function(dbquiz) {
    //             console.log(dbquiz);
    //           category.findOneAndUpdate({ _id: dbquiz._id }, {quiz: req.params.idquiz}, { new: true })
    //           .populate("quizzes")
    //            .then(function(dbcat) {
                 
    //              res.json(dbcat);
    //            })
    //            .catch(function(err) {
    //            res.sendStatus(404);
    //             // res.json(err);
    //            })
    //          })
    //     }
        // exports.desaffecterquizcat=(req,res)=>{
        //   category.findById(req.params.idcat)
        //       .then(function(dbquiz) {
        //           console.log(dbquiz);
        //         category.findOneAndUpdate({ _id: dbquiz._id }, {$unset:{quiz: req.params.idquiz}}, { new: true })
        //         .populate("quizzes")
        //          .then(function(dbcat) {
                   
        //            res.json(dbcat);
        //          })
        //          .catch(function(err) {
        //          res.sendStatus(404);
        //           // res.json(err);
        //          })
        //        })
        //   }
    
        exports.deletecategory=(req,res)=>{
          category.findByIdAndRemove(req.params.id,function(err,docs){
            if(err)
            res.sendStatus(404);
            //console.log(err);
            res.send("subcategory deleted");
        })}
        
        exports.updatecategory= (req, res, next) => {
            category.findByIdAndUpdate(req.params.id,{$set: req.body}, function (err, docs) {
                if (err) return  res.sendStatus(404);
                res.send('category udpated.');
            })
        }

        // exports.affecterquizcat=(req,res)=>{
        //   category.findById(req.params.idcat)
        //       .then(function(dbquiz) {
        //           console.log(dbquiz);
        //         category.findOneAndUpdate({ _id: dbquiz._id }, {$push: {quiz: req.params.idquiz}}, { new: true })
        //         .populate("quizzes")
        //          .then(function(dbcat) {
                   
        //            res.json(dbcat);
        //          })
        //          .catch(function(err) {
        //          res.sendStatus(404);
        //           // res.json(err);
        //          })
        //        })
        //   }

        //   exports.dessaffecterquizcat=(req,res)=>{

        //     category.findById(req.params.idcat)
        //     .then(function(dbquiz) {
        //         console.log(dbquiz);
        //       category.findOneAndUpdate({ _id: dbquiz._id }, {$pull: {quiz: req.params.idquiz}}, { new: true })
        //       .populate("quizzes")
        //        .then(function(dbcat) {
                 
        //          res.json(dbcat);
        //        })
        //        .catch(function(err) {
        //        res.sendStatus(404);
        //         // res.json(err);
        //        })
        //      })
        // }

      