const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String,
    quiz: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"quiz"
  }

   
   
  })
);

module.exports = Category;