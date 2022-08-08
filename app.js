var createError = require('http-errors');
var express = require('express');
const mongoose =require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config=require('./Database/mongodb.json');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors=require('cors')
var adminsRouter=require('./routes/admin');
var dialogflowRouter=require('./Dialogflow/Index')
var eventRouter = require('./routes/events');
var marksRouter = require('./routes/marks')
var jobsRouter = require('./routes/jobs')
const expressListRoutes = require('express-list-routes');

var catRouter = require('./routes/category');


var app = express();
//mongo config npm install mongoose
mongoose.connect(config.mongo.uri,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>console.log('connect')).catch((err)=>console.error(err));

const bodyParser= require('body-parser');

var quizRouter = require('./routes/Quiz');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());

///////////// routing to react/////////////

app.use(express.static('client/build'));
app.use(express.static('admin/build'));



// app.use('/admin',(_,res)=>{  res.sendFile(path.join(__dirname,'./admin/build/index.html'));})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); // dont forget this
});
app.use('/user', usersRouter);
app.use('/admin/', adminsRouter);
app.use('/dialogflow', dialogflowRouter);
app.use('/marks', marksRouter)
app.use('/jobs', jobsRouter)

app.use('/quiz', quizRouter);
app.use('/events',eventRouter);

app.use('/category', catRouter);

app.all('/admindashboard/*',(_,res)=>{  res.sendFile(path.join(__dirname,'./admin/build/index.html'));})
app.all('/*',(_,res)=>{  res.sendFile(path.join(__dirname,'./client/build/index.html'));})

//app.use('/course', coursesRouter);

// ti show all routes

expressListRoutes(app, { prefix: '' });


// ti show all routes

expressListRoutes(app, { prefix: '' });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');


  
});
app.listen(process.env.PORT || 5000);

module.exports = app;
