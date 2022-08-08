const mongoose = require("mongoose");
const level = Object.freeze({
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
});
const Quiz = mongoose.model(
  "Quiz",
  new mongoose.Schema({
    level: {
      type: String,
      enum: Object.values(level),
    },
    title:String,
    subcategory: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"subcat"
  }
 
    },
    )
    );

module.exports = Quiz;
