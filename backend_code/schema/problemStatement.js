const mongoose = require("mongoose");

const competition = require("../controllers/problemStatement");

const problemStatementSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  addedAt: {
    type: Date,
    default: Date.now(),
  },
  title: String,
  description: String,
  streams: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "streams",
  },
  competition:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'competition'
  },
  approval:String,
  status: String,
  verifiedAt: Date,
});

module.exports = mongoose.model("problemStatement", problemStatementSchema);
