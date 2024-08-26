const mongoose = require("mongoose")
 

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
    require: true,
  },

});

module.exports = mongoose.model("User",userSchema)
   
