
const mongoose = require("mongoose")

const contactUserSchema = new mongoose.Schema({
    name: {
        type: String,
        require : true
    },
    email: {
        type: String,
        
        require:true
    },
    subject: {
        type: String,
        require:true
    },
    message: {
        type: String,
        require:true
    },
    location: {
        type: String,
        require:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", contactUserSchema)