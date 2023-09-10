const mongoose = require("mongoose");

const competition = require("../controllers/competition");

const projectSchema = new mongoose.Schema({
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
  streams: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stream",
  },
  competition:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'competition'
  },
  teamMember: [],
  status: String,
  verifiedAt: Date,
});

module.exports = mongoose.model("project", projectSchema);
