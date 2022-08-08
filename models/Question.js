const mongoose = require("mongoose");


const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    question: String,
    rep1:String,
    rep2:String,
    rep3:String,
    repcorrecte:String,
    quiz: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"quiz"
  }
  },
    )
    );

module.exports = Question;