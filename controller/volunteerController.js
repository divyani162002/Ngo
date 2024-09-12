const Volunteer = require("../model/volunteerSchema");
const fs = require("fs");
const path = require("path");

exports.getVolunteer = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json({ volunteers });
  } catch (error) {
    res.status(400).json({
      message: "Failed to find volunteers",
      error: error.message, // Include the error message for debugging
    });
  }
};

exports.addVolunteer = async (req, res) => {
  const { name, joining, gender, age,phoneNumber, district, imgUrl } = req.body;

  try {
    // Create a new entry
    console.log("file recieved", req.files);
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        message: "no file uploaded",
      });
    }

    const file = req.files.file;
    const uploadDir = path.join(__dirname, "files");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, Date.now() + "_" + file.name);

    file.mv(filePath, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error saving file in volunteer", error });
      }

      const newVolunteer = new Volunteer({
        name,
        joining,
        gender,
        age,
        phoneNumber,
        district,
        imgUrl: filePath,
      });
      newVolunteer.save();
      res.status(201).json({
        message: "volunteer added successfully",
        newVolunteer,
      });
      console.log(newVolunteer);
    });
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(400).json({
      message: "Failed to add volunteer",
      error: error.message, // Optionally include the error message for debugging
    });
  }
};

exports.deleteVolunteer = async (req, res) => {
  
  try {
    const id = req.params.id 
    console.log(id)

    if (!id) {
      return res.status(400).json({
       msg:"id not found"
      })
      
    }
    const volunteer = await Volunteer.findByIdAndDelete(id);
    if (!volunteer) {
      return res.status(400).json({
        msg:"volunteer not found"
      })
    }
    return res.status(200).json({msg:"volunteer deleted successfully",volunteer})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:error.message})
  }
}


exports.searchVolunteer = async (req, res) => {
  try {
    const {district} = req.query

    if (!district) {
      return res.status(400).json({ message: "District is required" });
    }
    const volunteers = await Volunteer.find({ district: district });

    if (volunteers.length === 0) {
      return res
        .status(404)
        .json({ message: "No volunteers found in this district" });
    }

    res.json(volunteers);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
  
}