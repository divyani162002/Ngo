const mongoose = require("mongoose")

const adoptionSchema = new mongoose.Schema({
  species: {
    type: String,
    require: true,
  },

  breed: {
    type: String,
  },

  animaldetails: {
    type: String,
  },

  age: {
    type: Number,
  },

  location: {
    type: String,
    require: true,
  },
  imgUrl: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Adoption",adoptionSchema)