const course = require("../models/Course");
const fetch = require("node-fetch");
exports.apiudemy = (req, res) => {
  console.log(req.params.search);
  const url1 =
    "https://www.udemy.com/api-2.0/courses/?search=" +
    req.params.search +
    "&price=price-free&language=" +
    req.params.language +
    "&ratings=4.5" +
    "&duration=" +
    req.params.Duration;

  fetch(url1, {
    method: "GET",
    headers: {
      Authorization:
        "Basic aDdhblB1NzAzOTBYM0VRM0xueWl5UGhNcUFRT2c5NXYyQnRHSDBYaDo0ak12ejNmRHc4Ymh5Mnhhdk1hSUEya25QUlFtS004ODRLQ0dHMmFMYThvSVF3TTRobUhJcFB2VFlsRW9QYlJaY0tmOXBVb21ubjVLSTd3UGJxREFVejBQTTJmN0k3WVlKaUpoN0FUWTRNUVhQYzhUbkhwTDQyYXJ3VFAyVVlnSg==",
    },
  })
    .then((res) => {
      // console.log("hello");
      return res.json();
    })
    .then((json) => {
      //console.log(json.results);
      t = [];
      for (let i = 0; i < 5; i++) {
        new course({
          name: json.results[i].title,
          url: "https://www.udemy.com" + json.results[i].url,
          validation: false,
          user: "607326aaa76ad63fa481f0a4",
          progress: 0,
          language: req.params.language,
          Duration: req.params.Duration,
        }).save();
        t.push("https://www.udemy.com" + json.results[i].url);

        // console.log(_id);
      }
      //console.log(res.json(data));

      res.send(t);
    })
    .catch((err) => res.sendStatus(404));
};
exports.getallcourses = (req, res, next) => {
  course.find(function (err, data) {
    res.json(data);
  });
};
exports.deletecourse = (req, res) => {
  course.findByIdAndRemove(req.params.id, function (err, docs) {
    if (err) res.sendStatus(404);
    //console.log(err);
    res.send("subcategory deleted");
  });
};
exports.searchcourse = (req, res) => {
  var regx = new RegExp(req.params.name, "i");
  course.find({ name: regx }).then((result) => {
    res.status(200).json(result);
  });
};
exports.affecteruser = (req, res) => {
  course.findById(req.params.idc).then(function (dbuser) {
    console.log(dbuser);
    course
      .findOneAndUpdate(
        { _id: dbuser._id },
        { user: req.params.idu },
        { new: true }
      )
      .populate("users")
      .then(function (dbcourse) {
        res.json(dbcourse);
      })
      .catch(function (err) {
        res.sendStatus(404);
        // res.json(err);
      });
  });
};

exports.getCourse = (req, res) => {
  course.findById(req.params.idu, function (err, data) {
    if (err) {
      res.sendStatus(404);
    } else res.json(data);
  });
};
exports.getCourseu = (req, res) => {
  //id = User.findById(req.params.id);

  course.find({ user: req.params.id }, function (err, data) {
    if (err) {
      console.log(err);
      console.log(data);
      res.status(500).send({ message: "Data Not found" });
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  });
};
exports.validatecourse = (req, res, next) => {
  course.findByIdAndUpdate(
    req.params.id,
    { $set: { validation: true } },
    function (err, docs) {
      if (err) return res.sendStatus(404);
      res.send(docs.validation);
    }
  );
};
exports.progress = (req, res, next) => {
  course.findByIdAndUpdate(
    req.params.id,
    { $inc: { progress: 10 } },
    function (err, docs) {
      if (err) return res.sendStatus(404);
      res.send(docs);
    }
  );
};

exports.updatesubcat = (req, res, next) => {
  course.findByIdAndUpdate(
    req.params.productId,
    { $set: { ratings: 2 } },
    { new: true },
    function (err, docs) {
      if (err) return res.sendStatus(404);
      //next(err);
      res.send("subcategory udpated.");
    }
  );
};

exports.rateUser = (req, res) => {
  console.log(typeof req.params.id);
  course
    .aggregate(
      { $match: { _id: req.params.id } },
      { $group: { _id: "$courseId", ratings: { $avg: "$noOfStars" } } }
    )
    .then(function () {
      course.findByIdAndUpdate(req.params.id, ratings);
    });
};
exports.rating = (req, res, next) => {
  course.findByIdAndUpdate(
    req.params.idcat,
    { $inc: { ratings: 0.5 } },
    function (err, docs) {
      if (err) return res.sendStatus(404);
      //next(err);
      res.send("subcategory udpated.");
    }
  );
};
exports.recommandation = (req, res) => {
  //console.log(req.params.search);
  const url3 =
    "https://www.udemy.com/api-2.0/courses/?subcategory=" +
    req.params.subcategory;

  fetch(url3, {
    method: "GET",
    headers: {
      Authorization:
        "Basic aDdhblB1NzAzOTBYM0VRM0xueWl5UGhNcUFRT2c5NXYyQnRHSDBYaDo0ak12ejNmRHc4Ymh5Mnhhdk1hSUEya25QUlFtS004ODRLQ0dHMmFMYThvSVF3TTRobUhJcFB2VFlsRW9QYlJaY0tmOXBVb21ubjVLSTd3UGJxREFVejBQTTJmN0k3WVlKaUpoN0FUWTRNUVhQYzhUbkhwTDQyYXJ3VFAyVVlnSg==",
    },
  })
    .then((res) => {
      // console.log("hello");
      return res.json();
    })
    .then((json) => {
      console.log(json.results.length);
      t = [];
      for (let i = 0; i < 3; i++) {
        new course({
          name: json.results[i].title,
          url: "https://www.udemy.com" + json.results[i].url,
          validation: false,
          progress: 0,
          language: req.params.language,
          Duration: req.params.Duration,
        }).save();
        t.push("https://www.udemy.com" + json.results[i].url);
        console.log(json.results[i].url);
      }

      res.send(t);
    })
    .catch((err) => res.sendStatus(404));
};
