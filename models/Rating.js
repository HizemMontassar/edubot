const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rating = mongoose.model(
    "Rating",
new mongoose.Schema({
    userId:Number,
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    noOfStars: {
        type: Number,
        default: 0
    }

}
)
);

module.exports = rating;