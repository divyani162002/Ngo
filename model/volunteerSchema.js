const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

 
  joining: {
    type: Date,
    default: Date.now,
  },
  

  gender: {
    type: String,
    require: true,
  },

  age: {
    type: Number,
  },
  phoneNumber: {
    type: Number,
    require:true
  },

  district: {
    type: String,
    require: true,
  },
  imgUrl: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
