const mongoose = require("mongoose");
const Enum = require('enum');


const lang = Object.freeze({
  anglais: 'en',
  francais: 'fr',
  espanol: 'es',
});
const duration = Object.freeze({
  short: 'short',
  medium: 'medium',
  long: 'long',
  extralong:'extralong'
});
const course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name:String,
    url: String,
    validation:Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserSchema'
  },
    progress: { type: Number },
    language: {
      type: String,
      enum: Object.values(lang),
    },
    Duration: {
      type: String,
      enum: Object.values(duration),
    },
    ratings: {
      type: Number,
      default: 0
  }
   
  })
    );

module.exports = course;