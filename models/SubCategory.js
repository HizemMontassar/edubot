const mongoose = require("mongoose");

const SubCategory = mongoose.model(
  "Subcat",
  new mongoose.Schema({
    name: String,
    category: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"category"
  }
  })
);

module.exports = SubCategory;