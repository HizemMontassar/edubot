const mongoose = require("mongoose");

const Mark = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema'
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    category: { type: String},
    type: { type: String},
    date: { type: Date, default: Date.now },
    mark: { type: Number }
  },
  { collection: "marks" }
);

const model = mongoose.model("Mark", Mark);

module.exports = model;