const express = require("express");
var router = express.Router();
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Simpleuser = require("../models/User");
var nodemailer = require('nodemailer');
const isAuth = require("../middleware/auth");
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')
const session = require("express-session");
require('dotenv').config()

/////auth gmail

//jwt utiliser pour le mdp
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
/*router.post('/register/', async function(req,res,next)
{
	emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	console.log("aaaaaaaaa")
	const { username, password: plainTextPassword,email ,lastname,firstname, role,image,activated} = req.body
	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (!email || typeof email !== 'string' || emailRegex.test(email)== false) {
		return res.json({ status: 'error', error: 'Invalid email' })
	}
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}
//////////////verification//////////////////////////////
	const password = await bcrypt.hash(plainTextPassword, 10)
    console.log('pass' ,password)
	try {
		const response = await Simpleuser.create({
			username,
			password,email,lastname,firstname,role,image,activated
		})
////////////////		
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: "edubot4twin5@gmail.com",
        pass: "Edubot404",
	}
});
  
var mailOptions = {
	from: 'Edubot',
	to: email,
	subject: 'Register EduBot',
	text: 'Welcom  to EduBot , your registration is successful , your username is : ' + JSON.stringify(username)  
  };
  
  transporter.sendMail(mailOptions, function(error, info){
	if (error) {
	  console.log(error);
	} else {
	  console.log('Email sent: ' + info.response);
	}
  });
  //////////////////////
		console.log(email)
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}
	
	res.json({ status: 'ok' })
	
})
*/

  /*login admin*/
router.post('/login/', async (req, res) => {
	const { username, password } = req.body
	console.log(password)

	const user = await Simpleuser.findOne({ username }).lean()
	console.log(user)
	if  (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}
	if(await bcrypt.compare(password, user.password)==false)
	{
		return res.json({ status: 'error', error: 'Invalid password' })

	}
	else if (user.role=="admin")
	{
		if (await bcrypt.compare(password, user.password)) {
	
			const token = jwt.sign(
				{
				  _id: user._id,
				  username:user.username
				},
				"secretkey",
				{ expiresIn: "3600s" },
				JWT_SECRET
			  );
			  // const decode=jwt_decode(token)
			  //console.log('decode',decode)
			  return res.json({ status: "ok", data: token });
			  console.log("ok");
		}
	}
	else
	{
		res.json({ status: 'error', error: 'You are not an admin'});
		console.log('no')

	}
})
///////////////////////users Accounts/////////////////////////
router.get('/displayusers/',isAuth,function(req, res, next) {
    Simpleuser.find(function(err,data)
    {
        if(err)
        {
         console.log(err);
        }
		else{
            
            console.log("done")
	        res.json(data)

        }
    })
});
router.post('/adduser/',isAuth,async function(req,res,next)
{
	emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	console.log("aaaaaaaaa")
	const { username, password: plainTextPassword,email ,lastname,firstname,role = "simpleuser",image,activated} = req.body
	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (!email || typeof email !== 'string' || emailRegex.test(email)== false) {
		return res.json({ status: 'error', error: 'Invalid email' })
	}
	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)
    console.log('pass' ,password)
	try {
		const response = await Simpleuser.create({
			username,
			password,email,lastname,firstname,role,image,activated
		})
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: "edubot4twin5@gmail.com",
        pass: "Edubot404",
	}
});
  
var mailOptions = {
	from: 'Edubot',
	to: email,
	subject: 'Register EduBot',
	text: 'Welcom  to EduBot , your registration is successful , your username is : ' + JSON.stringify(username)  
  };
  
  transporter.sendMail(mailOptions, function(error, info){
	if (error) {
	  console.log(error);
	} else {
	  console.log('Email sent: ' + info.response);
	}
  });
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}
	
	res.json({ status: 'ok' })
})
router.delete('/deleteuser/:id',isAuth,function(req,res,next)
{
    Simpleuser.findByIdAndRemove(req.params.id,
        function(err,data)
        {
			
            if (err)
                console.log(err);
            res.json(data)
        })
});
router.get('/disableduser/:id',isAuth,async (req,res)=>{
	const aa= req.params.id;
	console.log(aa)
    const user = await Simpleuser.findById( aa ) ;
	console.log(user)
	if (!user) {
        return res.json({ status: 'error', error: 'Invalid username' })
    }
    user.activated=0;
    try {
        const response = await user.save()
        return res.json({ status: response, message : 'succes' })
    }
    catch (error) {

        throw error
    }
})
router.get("/displayProfile/:id", async (req, res, next) => {
	const aa = req.params.id;
	console.log(aa);
	const user = await Simpleuser.findById(aa);
	console.log(user);
	res.json(user);
  });
  router.get("/count", isAuth,async (req, res, next) => {
	var i=0;
	const user = await Simpleuser.find();
	console.log(user.length)
	
		user.map((v,k)=>{
			if(v.activated===0)
			 {
                 i=i+1;
			 }
		})
		console.log(i)
		res.send({desactivated:i,activated:user.length-i})
	
  });
module.exports = router;

