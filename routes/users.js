const express = require("express");
var router = express.Router();
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../models/User");
var nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/auth");
const session = require("express-session");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "672601858751-vhnn8mdk7d2r1j61vggtnmeljdqeliol.apps.googleusercontent.com"
);

const { response } = require("../app");
const { token } = require("morgan");

const JWT_SECRET =
  "?plhjlk4sdfjfgdja4565sdbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
router.post("/register/", async function (req, res, next) {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const {
    username,
    password: plainTextPassword,
    email,
    lastname,
    firstname,
    role = "simpleuser",
    image,
  } = req.body;
  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!email || typeof email !== "string" || emailRegex.test(email) == false) {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }
  const password = await bcrypt.hash(plainTextPassword, 10);
  console.log("pass", password);
  try {
    const response = await User.create({
      username,
      password,
      email,
      lastname,
      firstname,
      role,
      image,
    });
    var token = jwt.sign(
      {
        _id: response._id,
        username:response.username

      },
      "secretkey",
      { expiresIn: "3600s" },
      JWT_SECRET
      );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "edubot4twin5@gmail.com",
        pass: "Edubot404",
      },
    });

    var mailOptions = {
      from: "Edubot",
      to: email,
      subject: "Register EduBot",
      text:
        "Welcom  to EduBot , your registration is successful , your username is : " +
        JSON.stringify(username),
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok",data:token });
});

router.post("/login/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }
  if ((await bcrypt.compare(password, user.password)) == false) {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
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
  res.json({ status: "error", error: "Invalid username/password" });
});
router.get("/success", (req, res) => {
  res.render("../views/profile", {
    name: req.user.displayName,
    pic: req.user.photos[0].value,
    email: req.user.emails[0].value,
  });
});

router.post("/changepassword/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ status: "error", error: "Invalid username" });
  }
  user.password = await bcrypt.hash(password, 10);
  try {
    const response = await user.save();
    return res.json({
      status: response,
      message: "password changed succesffuly",
    });
  } catch (error) {
    throw error;
  }
  return res.json({ status: "error", error: "could not change password" });
});
router.post("/experience", async function (req, res, next) {
  const experience = req.body.experience;
  const username = req.body.username;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ status: "error", error: "not exist" });
  }

  try {
    user.experience.push(experience);
    const response = await user.save();
    return res.json({
      status: response,
      message: "experience added succesffuly",
    });
  } catch (error) {
    throw error;
  }
});

router.post("/education", async function (req, res, next) {
  const education = req.body.education;
  const username = req.body.username;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ status: "error", error: "not exist" });
  }

  try {
    user.education.push(education);
    const response = await user.save();
    return res.json({
      status: response,
      message: "education added succesffuly",
    });
  } catch (error) {
    throw error;
  }
});

router.post("/hobbies", async function (req, res, next) {
  const hobbies = req.body.hobbies;
  const username = req.body.username;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ status: "error", error: "not exist" });
  }

  try {
    user.hobbies.push(hobbies);
    const response = await user.save();
    return res.json({
      status: response,
      message: "hobbies added succesffuly",
    });
  } catch (error) {
    throw error;
  }
});

router.post("/newskills", async function (req, res, next) {
  //const { newskills,experience,username,aquiredskills} = req.body
  const newskills = req.body.newskills;
  const username = req.body.username;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ status: "error", error: "not existe" });
  }

  try {
    user.newskills.push(newskills);

    const response = await user.save();
    return res.json({ status: response, message: "added succesffuly" });
  } catch (error) {
    throw error;
  }
});
router.post("/aquiredskills", async function (req, res, next) {
  const username = req.body.username;
  const aquiredskills = req.body.aquiredskills;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ status: "error", error: "not exist" });
  }

  try {
    user.aquiredskills.push(aquiredskills);
    const response = await user.save();
    return res.json({ status: response, message: "added succesffuly" });
  } catch (error) {
    throw error;
  }
});

router.get("/displayProfile/:id", async (req, res, next) => {
  const aa = req.params.id;
  console.log(aa);
  const user = await User.findById(aa);
  console.log(user);
  res.json(user);
});
///////////////////jdid/////////////////
router.post('/googlelogin/',(req,response,next)=>{
  const{tokenId}=req.body;
  client.verifyIdToken({idToken:tokenId,audience:'672601858751-vhnn8mdk7d2r1j61vggtnmeljdqeliol.apps.googleusercontent.com'}).then(res=>{
   const{email_verified,name,email,given_name,family_name,picture}=res.payload;
   console.log(res.payload)
   if(email_verified){
     User.findOne({email}).exec((err,user)=>{
       if(err){
        console.log(err)

       } else{
         if(user){
const token = jwt.sign(
      {
        _id: user._id,
        username:user.username
      },
      "secretkey",
      { expiresIn: "3600s" },
      JWT_SECRET
      );
      console.log("token login",token)
      // const decode=jwt_decode(token)
      //console.log('decode',decode)
       response.json({ status: "ok", data: token });

      //console.log(data)
         }else{
console.log(name)
let newUser= new User({username:name,email:email,firstname:given_name,lastname:family_name,picture:picture})
    try {
      newUser.save()
      const token = jwt.sign(
        {
          _id: newUser._id,
          username:newUser.username
        },
        "secretkey",
        { expiresIn: "3600s" },
        JWT_SECRET
        );
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "edubot4twin5@gmail.com",
            pass: "Edubot404",
          },
        });
    
        var mailOptions = {
          from: "Edubot",
          to: newUser.email,
          subject: "Register EduBot",
          text:
            "Welcom  to EduBot , your registration is successful , your username is : " +JSON.stringify(newUser.username),
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        console.log("token register",token)
        response.json({ status: "ok", data: token });

      console.log("User created successfully: ",newUser);
    } catch (error) {
      if (error.code === 11000) {
        // duplicate key
        return res.json({ status: "error", error: "Username already in use" });
      }
      throw error;
    }
//let newUser= new User({username:name,email:email,firstname:given_name,lastname:family_name})
//newUser.save((err,data)=>{
  // if (err) {
    // duplicate key
// console.log('user already to user')  }
// })
 
         }
       }
     })
   }
  })
})

module.exports = router;
