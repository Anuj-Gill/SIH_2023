const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SubCategorySchema = new Schema({
  name: String,
  mainCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "mainCategory",
  },
  deadline: Number,
  department: {
    type: Schema.Types.ObjectId,
    ref: "department",
  },
});

module.exports = mongoose.model("subCategory", SubCategorySchema);
