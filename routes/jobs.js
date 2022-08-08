var express = require("express");
var router = express.Router();
const Job = require("../models/Job");
const User = require("../models/User");
const config = require("../apiJobs/config");
const url = require("url");
const isAuth = require("../middleware/auth");
const axios = require("axios");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};

/* Get jobs listing from Adzuna api*/
router.post("/getjobslistings", async function (req, res, next) {
  var country = "gb";
  const { search, location } = req.body;
  switch (location) {
    case "Britain":
      country = "gb";
      break;
    case "usa":
      country = "us";
      break;
    case "Canada":
      country = "ca";
      break;
    case "France":
      country = "fr";
      break;
    case "Germany":
      country = "de";
      break;
  }
  const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${
    config.BASE_PARAMS
  }&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}`;
  console.log(`Proxy GET request to : ${targetURL}`);
  const results = await axios.get(targetURL);
  res.writeHead(200, headers);
  res.end(JSON.stringify(results.data));
});

/* Get all jobs*/
router.get("/getAllJobs", isAuth, function (req, res, next) {
  Job.find({})
    .populate("user")
    .then((data, err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Data Not found" });
      } else {
        console.log(data);
        res.status(200).send(data);
      }
    });
});

/* Get jobs by user*/
router.get("/getJobsByUser", async function (req, res, next) {
  const { username } = req.body;
  const user = await User.findOne({ username });
  const userid = user._id;
  console.log(userid);
  Job.find({ user: userid }, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Data Not found" });
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  });
});

/* add job to user*/
router.post("/addJob", async function (req, res, next) {
  const {
    salary,
    country,
    starting_date,
    ending_date,
    position,
    contract,
    type,
    username,
  } = req.body;
  try {
    const user = await User.findOne({ username });
    const response = await Job.create({
      salary,
      country,
      starting_date,
      ending_date,
      position,
      contract,
      type,
      user,
    });
    console.log(response);
    res.status(200).json({ message: "Job added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding job" });
  }
});
/* Update Job */
//////////// TODO: Make that the number of modified parameters is dynamic and not all fields must be supplied
router.put("/updateJob", async function (req, res, next) {
  const {
    id,
    salary,
    country,
    starting_date,
    ending_date,
    position,
    contract,
    type,
    username,
  } = req.body;
  const job = await Job.findById(id);
  const user = await User.findOne({ username });
  job.salary = salary;
  job.country = country;
  job.starting_date = starting_date;
  job.ending_date = ending_date;
  job.position = position;
  job.contract = contract;
  job.type = type;
  job.user = user;
  try {
    const response = await job.save();
    res.status(200).send({ message: "Job modified succesffuly" });
  } catch (error) {
    console.error(error.code);
    res.status(500).send({ message: "Could not update job" });
  }
});

/* Delete all user's jobs */
router.delete("/deleteAllUsersJobs", async function (req, res, next) {
  const userid = req.body;
  Job.deleteMany({ userId: userid }, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "No data found" });
    } else {
      res.status(200).send({ message: "Jobs deleted successfully" });
    }
  });
});

/* Delete one job */
router.delete("/deleteOneJob", async function (req, res, next) {
  const { jobid } = req.body;
  Job.findOneAndDelete({ _id: jobid }, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "No data found" });
    } else {
      res.status(200).json({ message: "Job deleted successfully" });
    }
  });
});

module.exports = router;
