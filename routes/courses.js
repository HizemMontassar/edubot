var express = require('express');
var router = express.Router();
const coursesController =require('../Controllers/Courses')

router.get('/apiudemy/:search/:language/:Duration',coursesController.apiudemy);
