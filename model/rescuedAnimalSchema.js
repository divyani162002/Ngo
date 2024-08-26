

const mongoose = require("mongoose")

const resucedSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
 
  status: {
    type: String,
    require: true,
  },
  admission: {
    type: Date,
    default: Date.now,
  },
    species: {
        type: String,
        require:true
  },

    breed: {
        type: String,
        
  },

    colour: {
        type: String
    },

  gender: {
        type: String,
        require:true
    },

    age: {
      type:Number
  },

    location: {
        type: String,
        require:true
    },
    imgUrl: {
        type: String,
        require:true
    }
});


module.exports = mongoose.model("Rescued",resucedSchema)