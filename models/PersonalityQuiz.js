const mongoose = require("mongoose");

const PersonalityQuiz = mongoose.model(
"Personalityquiz",
new mongoose.Schema({

    category:String,
    difficulty:String,
    question:String,
    correct_answer:String,
    rep1:String,
    rep2:String,
    rep3:String,
    rep4:String,
    repselected:String

})

)
module.exports = PersonalityQuiz;
