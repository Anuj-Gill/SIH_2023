const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema({
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
  // problemStatement:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:"problemStatement",
  // },
  deadline: Date,
  streams: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stream",
  },
  teamSize:Number,
  fundingLimit:Number,
  status: String,
  verifiedAt: Date,
});

module.exports = mongoose.model("competition", competitionSchema);
