const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  title: String,
  description: String,
  deadline: Date,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  assignedAt: {
    type: Date,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mainCategory",
  },
  status: { type: String, default: "review" },
  verifiedAt: Date,
});

module.exports = mongoose.model("grievance", grievanceSchema);
