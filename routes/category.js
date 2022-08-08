var express = require('express');
var router = express.Router();

const coursesController =require('../Controllers/Courses')
const isAuth = require("../middleware/auth");



// /* subcategory */ 
// router.post('/addsub/:idcat',subcatController.addsubcat);
// router.post('/addsub',subcatController.addsubcategory);
// router.get('/getallsub',subcatController.getallsub);
// router.get('/getsub/:id',subcatController.getsub);
// router.delete('/deletesub/:id',subcatController.deletesubcat);
// router.put('/updatesub/:id',subcatController.updatesubcat);
// router.put('/affcatsub/:idsub/:idcat',subcatController.affectercat);
// router.put('/desaffectercatsub/:idsub/:idcat',subcatController.desaffectercat);
// router.get('/searchSubcat/:name',subcatController.searchsubcat);
// /* category */ 
// router.get('/getallcat',catController.getallcategories);
// router.get('/getcategory/:id',catController.getcategory);
// router.post('/addcategory',catController.addcategoryn);
// router.delete('/deletecategory/:id',catController.deletecategory);
// router.put('/updatecategory/:id',catController.updatecategory);
// router.post('/addcat/:idquiz',catController.addcategory);
// // router.put('/affecterquizcat/:idcat/:idquiz',catController.affecterquizcat);
// // router.put('/desaffecterquizcat/:idcat/:idquiz',catController.desaffecterquizcat);
// router.get('/searchCategory/:name',catController.searchcategory);



/* courses api */ 
router.get('/apiudemy/:search/:language/:Duration',coursesController.apiudemy);
router.get('/getallCourses',isAuth,coursesController.getallcourses);
router.delete('/deletecourse/:id',coursesController.deletecourse);
router.get('/searchCourse/:name',coursesController.searchcourse);
router.put('/affecteruser/:idc/:idu',coursesController.affecteruser);
router.get('/getCourse/:idu',coursesController.getCourse);
router.put('/validatecourse/:id',coursesController.validatecourse);
router.put('/progress/:id',coursesController.progress);
// rating
router.get("/getuser/:id",isAuth,coursesController.getCourseu);
router.put("/rate",coursesController.rateUser);
router.put('/rateadd/:idcat',coursesController.rating);
router.get('/apiudemy/:subcategory',coursesController.recommandation);
// router.get('/getallques',questionController.getallqsts);
// router.post('/addques/:idquiz',questionController.addques);
//  router.put('/affecterquesquiz/:idques/:idquiz',questionController.affecterquizques);
//  router.put('/updateques/:id',questionController.updateques);
//  router.get('/getques/:id',questionController.getques);
//  router.put('/desfquesquie/:idques/:idquiz',questionController.dessaffecterquestionquiz);
//  router.delete('/deleteques/:id',questionController.deleteques)

// router.get('/getallquiz',quizController.getallquizzes);
//  router.post('/addquiz',quizController.addquizz);
// // router.post('/delete/:id',quizController.deletequizz);
// // router.put('/update/:id',quizController.updatequizz);
//  router.get('/getquiz/:id',quizController.getquiz);
//  //router.put('/affecterquesquiz/:idques/:idquiz',quizController.affecterquestionquiz);
//  //router.put('/desaffecterquesquiz/:idques/:idquiz',quizController.dessaffecterquestionquiz);
//  router.delete('/deletequiz/:id',quizController.deletequizz);
//  router.put('/updatequiz/:id',quizController.updatequiz);
//  router.get('/getcatofsub/:name',subcatController.filtercat);
//  router.get('/filtercatid/:name',catController.filtercatid);
//  router.get('/getallcatname',catController.getallcategoriesname);




module.exports=router;