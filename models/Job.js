const mongoose = require("mongoose");

const Job = new mongoose.Schema(
  {
    salary: { type: Number },
    country: { type: String },
    starting_date: { type: Date },
    ending_date: { type: Date },
    position: { type: String },
    contract: { type: String },
    type: { type: String, enum:['work','internship'] },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema'
    }
  },
  { collection: "jobs" }
);

const model = mongoose.model("Job", Job);

module.exports = model;