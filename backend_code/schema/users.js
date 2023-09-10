const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: String,
  hash: String,
  firstName: String,
  lastName: String,
  mobile: String,
  dob: Date,
  salt: String,
  gender: String,
  role: String,
  college:{
    type:Schema.Types.ObjectId,
    ref:'hei',
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "country",
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "state",
  },
  district: {
    type: Schema.Types.ObjectId,
    ref: "district",
  },
  streams: {
      type: Schema.Types.ObjectId,
      ref: "stream",
    },

});

module.exports = mongoose.model("user", UserSchema);
