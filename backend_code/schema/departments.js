const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const DepartmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  // grievanceSubCategory: {
  //   type: [Schema.Types.ObjectId],
  //   ref: "subCategory",
  // },
  employees: {
    type: [Schema.Types.ObjectId],
    ref: "user",
  },
});

module.exports = mongoose.model("department", DepartmentSchema);
