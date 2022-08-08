var express = require('express');
var router = express.Router();
const quizController =require('../Controllers/Quiz')
const questionController =require('../Controllers/Question')
const quizPController =require('../Controllers/PerQuiz')
const subcatController =require('../Controllers/SubCategory')
const catController =require('../Controllers/Category')
const statquizController =require('../Controllers/StatQuiz')
const isAuth = require("../middleware/auth");


router.get('/getallques',isAuth,questionController.getallqsts);////
router.post('/addques/:idquiz',isAuth,questionController.addques);
router.post('/addques',isAuth,questionController.addques);
 router.put('/affecterquesquiz/:idquiz/:idques',isAuth,questionController.affecterquizques);
 router.put('/updateques/:id',isAuth,questionController.updateques);
 router.get('/getques/:id',isAuth,questionController.getques);
 router.put('/desfquesquie/:idques/:idquiz',isAuth,questionController.dessaffecterquestionquiz);
 router.delete('/deleteques/:id',isAuth,questionController.deleteques)///

router.get('/getallquiz',isAuth,quizController.getallquizzes);///
 router.post('/addquiz',isAuth,quizController.addquiz);
 router.post('/addquizz/:idsubcat',isAuth,quizController.addquizz);
// router.post('/delete/:id',quizController.deletequizz);
// router.put('/update/:id',quizController.updatequizz);
 router.get('/getquiz/:id',quizController.getquiz);////////
 router.put('/affectersubcatquiz/:idsubcat/:idquiz',isAuth,quizController.affectersubcatquiz);
 router.put('/desaffectersubcatquiz/:idsubcat/:idquiz',isAuth,quizController.dessaffectersubcatquiz);
 router.delete('/deletequiz/:id',isAuth,quizController.deletequizz);
 router.put('/updatequiz/:id',isAuth,quizController.updatequiz);
 router.get('/getquizlevel/:name/:level',quizController.filterquiz);
 router.get('/filtersubquiz/:id',quizController.filtersubquiz);
 router.get('/filterquesquiz/:id',quizController.filterquesquiz);

 router.post('/addsub/:idcat',isAuth,subcatController.addsubcat);
 router.post('/addsub',isAuth,subcatController.addsubcategory);
 router.get('/getallsub',isAuth,subcatController.getallsub);///////////
 router.get('/getsub/:id',isAuth,subcatController.getsub);
 router.delete('/deletesub/:id',isAuth,subcatController.deletesubcat);
 router.put('/updatesub/:id',isAuth,subcatController.updatesubcat);
router.put('/affcatsub/:idsub/:idcat',isAuth,subcatController.affectercat);
router.put('/desaffectercatsub/:idsub/:idcat',isAuth,subcatController.desaffectercat);
router.get('/getcatofsub/:name',subcatController.filtercat);

router.get('/getallcat',isAuth,catController.getallcategories);////
router.get('/getcategory/:id',isAuth,catController.getcategory);////////
router.post('/addcategory',isAuth,catController.addcategoryn);
//router.post('/addcat/:idquiz',catController.addcategory);
//router.put('/affecterquizcat/:idcat/:idquiz',catController.affecterquizcat);
//router.put('/desaffecterquizcat/:idcat/:idquiz',catController.desaffecterquizcat);
router.delete('/deletecategory/:id',isAuth,catController.deletecategory);
router.put('/updatecategory/:id',isAuth,catController.updatecategory);
router.get('/filtercatid/:name',catController.filtercatid);
router.get('/getallcatname',catController.getallcategoriesname);

//router.post('/dialogflow',express.json(),dialogflowController.consommation);

//router.get('/apiudemy/:search/:language/:Duration',coursesController.apiudemy);

router.get('/apiquiz',quizPController.apiquiz);

router.post('/statquiz/:id',statquizController.addquiz);// /statquiz/:iduser
router.get('/statquizadmin',isAuth,statquizController.StatsQuizAdmin);
router.get('/statquizuser/:id',statquizController.StatsQuizUser);

module.exports=router;