const mongoose = require("mongoose");

const StatQuiz = mongoose.model(
  "statquiz",
  new mongoose.Schema({
    user_id: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"UserSchema"
  },
    subcategory:String
 

   
   
  })
);

module.exports = StatQuiz;