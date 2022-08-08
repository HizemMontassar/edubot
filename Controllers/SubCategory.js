const quiz = require("../models/Quiz");
const subcategory = require("../models/SubCategory");
const category = require("../models/Category");
const url=require('url');
const querystring=require('querystring');


exports.addsubcat=(req,res)=> {
    new subcategory({name:req.body.name}).save().then(function(dbcat) {
       console.log();
     subcategory.findOneAndUpdate({ _id: dbcat._id },  {category: req.params.idcat}, { new: true })
     .populate("categories")
      .then(function(dbsubcat) {
        
        res.json(dbsubcat);
      })
      .catch(function(err) {
        
        res.json(err);
      })
    })}
exports.affectercat=(req,res)=>{
    subcategory.findById(req.params.idsub)
        .then(function(dbcat) {
            console.log(dbcat);
          subcategory.findOneAndUpdate({ _id: dbcat._id },  {category: req.params.idcat}, { new: true })
          .populate("categories")
           .then(function(dbsubcat) {

             res.json(dbsubcat);
           })
           .catch(function(err) {
           res.sendStatus(404);
            // res.json(err);
           })
         })
    }
    exports.desaffectercat=(req,res)=>{
        subcategory.findById(req.params.idsub)
            .then(function(dbcat) {
                console.log(dbcat);
              subcategory.findOneAndUpdate({ _id: dbcat._id },  {$unset:{category: req.params.idcat}}, { new: true })
              .populate("categories")
               .then(function(dbsubcat) {
    
                 res.json(dbsubcat);
               })
               .catch(function(err) {
               res.sendStatus(404);
                // res.json(err);
               })
             })
        }


exports.addsubcategory= (req, res, next) => {
  new subcategory({name:req.body.name}).save().then(function(dbcat) {
    console.log();
  subcategory.findOneAndUpdate({ _id: dbcat._id },  {category: req.params.idcat}, { new: true })
  .populate("categories")
   .then(function(dbsubcat) {
     
     res.json(dbsubcat);
   })
   .catch(function(err) {
     
     res.json(err);
   })
 }) };

// // exports.filterniveau=(req,res,next)=>{
// //     var params=querystring.parse(url.parse(req.url).query);
// //     // console.log(params);
// //     subcategory.find(params,function(err,data){
// //         res.json(data);})
// // }

exports.filtercat=(req,res,next)=>{
  
  console.log(req.params.name)
   category.findOne({name:req.params.name},function(err,data){
       //console.log(data.id)
       t=[]
       subcategory.find({category:data.id},function(err,data){
         data.map((resp)=>{console.log(resp.name);t.push(resp.name);})
        res.send(t)
        })
     })
       
    
}


exports.deletesubcat= (req, res, next) => {
  subcategory.findByIdAndRemove(req.params.id,function(err,docs){
      if(err)
      res.sendStatus(404);
      //console.log(err);
      res.send("category deleted");
  })
  };
exports.updatesubcat= (req, res, next) => {
  subcategory.findByIdAndUpdate(req.params.id,{$set: req.body}, function (err, docs) {
      if (err) return  res.sendStatus(404);
      //next(err);
      res.send('subcategory udpated.');
  })
}





// // async function filter(niv) {
// //     try {
// //       await client.connect();
// //       const database = client.db("quizzes");
// //       const subcats = database.collection("subcats");
// //       // Query for a movie that has the title 'The Room'
// //       const query = { niveau: niv };
// //       const options = {
// //         // sort matched documents in descending order by rating
// //         sort: { rating: -1 },
// //         // Include only the `title` and `imdb` fields in the returned document
// //        // projection: { _id: 0, name: 1, niveau: 1 },
// //       };
// //       const subcat = await subcats.findOne(query, options);
// //       // since this method returns the matched document, not a cursor, print it directly
// //       console.log(subcat);
// //     } finally {
// //       await client.close();
// //     }
// //   }
// //   filter().catch(console.dir);

exports.getallsub= (req, res, next) => {
        subcategory.find(function(err,data){
            res.json(data);
        })};
exports.getsub=(req,res,next)=>{
    subcategory.findById(req.params.id,function(err,data){
        if(err)
        {res.sendStatus(404);}
        else
        res.json(data);})
}

// // exports.affecterquizasub=(req,res)=>{

// //     subcategory.findById(req.params.idsub)
// //     .then(function(dbquiz) {
// //         console.log(dbquiz);
// //       subcategory.findOneAndUpdate({ _id: dbquiz._id }, {$push: {quiz: req.params.idquiz}}, { new: true })
// //       .populate("quizzes")
// //        .then(function(dbsubcat) {
         
// //          res.json(dbsubcat);
// //        })
// //        .catch(function(err) {
// //        res.sendStatus(404);
// //         // res.json(err);
// //        })
// //      })
// // }

// // exports.dessaffecterquizasub=(req,res)=>{

// //     subcategory.findById(req.params.idsub)
// //     .then(function(dbquiz) {
// //         console.log(dbquiz);
// //       subcategory.findOneAndUpdate({ _id: dbquiz._id }, {$pull: {quiz: req.params.idquiz}}, { new: true })
// //       .populate("quizzes")
// //        .then(function(dbsubcat) {
         
// //          res.json(dbsubcat);
// //        })
// //        .catch(function(err) {
// //        res.sendStatus(404);
// //         // res.json(err);
// //        })
// //      })
// // }

// // exports.addsub=(req,res)=> {
// //     new subcategory({name:req.body.name,niveau:req.body.niveau}).save().then(function(dbquiz) {
// //        console.log(dbquiz);
// //      subcategory.findOneAndUpdate({ _id: dbquiz._id }, {$push: {quiz: req.params.id}}, { new: true })
// //      .populate("quizzes")
// //       .then(function(dbsubcat) {
        
// //         res.json(dbsubcat);
// //       })
// //       .catch(function(err) {
        
// //         res.json(err);
// //       })
// //     })}

// // exports.deletesub=(req,res)=>{
// //     subcategory.findById(req.params.id, function(err, sub) {

// //     if (err)
// //     {
// //         return next(new restify.InternalError(err));}
// //     else if (!sub)
// //         return next(new restify.ResourceNotFoundError('The resource you requested could not be found.'));
// //     quiz.find({_id: quiz._id}).remove();
// //     sub.remove();
// //     res.send({id: req.params._id});
// // })}

// exports.updatesubcat= (req, res, next) => {
//     subcategory.findByIdAndUpdate(req.params.id,{$set: req.body}, function (err, docs) {
//         if (err) return  res.sendStatus(404);
//         res.send('subcategory udpated.');
//     })
// }


