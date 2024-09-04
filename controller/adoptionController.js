const Adoption = require("../model/adoptionSchema");


exports.getAdoptionDetails = async (req, res) => {
    try {
        const adoptionDetail = await Adoption.find()
        res.json({adoptionDetail})
        
    } catch (error) {
         res.status(400).json({
           message: "Failed to find adoption details",
           error: error.message, // Include the error message for debugging
         });
    }

    
}

exports.addadoptionDetails = async (req, res) => {
    const { species, breed, animaldetails, age, location } = req.body
      try {
        // Create a new user object
        const newadoptionDetail = new Adoption({
          species,
          breed,
          animaldetails,
          age,
          location,
        });

        // Save the new user to the database
        await newadoptionDetail.save();

        // Send a single response
        res.status(201).json({
          message: "adoption detail is created",
          newadoptionDetail,
        });
          console.log(newadoptionDetail)
      } catch (error) {
        // Handle any errors
        res.status(400).json({
          message: "adoption not created",
          error: error.message,
        });
      }
}

exports.deleteadoptionDetails = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({
        msg: "adoption details not found",
      });
    }

    const adoptionDetail = await Adoption.findByIdAndDelete(id);
    if (!adoptionDetail) {
      return res.status(400).json({
        msg: "users not found",
      });
    }
    return res.status(200).json({ msg: "adoption details deleted successfully", adoptionDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};