const Rescue = require("../model/rescuedAnimalSchema");
const fs = require("fs");
const path = require("path");

exports.getrescuedAnimals = async (req, res) => {
  try {
    const rescuedAnimals = await Rescue.find();
    res.json({ rescuedAnimals });
  } catch (error) {
    res.status(400).json({
      message: "Failed to retrieve rescued animals",
      error: error.message, // Include the error message for debugging
    });
  }
};


exports.addrescues = async (req, res) => {
  const {
    name,
    status,
    admission,
    species,
    breed,
    colour,
    gender,
    age,
    location,
    imgUrl, // This will be overwritten by the file path
  } = req.body;

  try {
    // Check if the file is uploaded
    if (!req.files || !req.files.imgUrl) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const file = req.files.imgUrl; // Accessing the file under imgUrl
    const uploadDir = path.join(__dirname, "files");

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Construct the file path
    const filePath = path.join(uploadDir, Date.now() + "_" + file.name);

    // Move the file to the desired directory
    file.mv(filePath, async (error) => {
      if (error) {
        return res.status(500).json({
          message: "Error saving file in rescueAnimal",
          error,
        });
      }

      // Create a new rescue entry with the file path as imgUrl
      const newRescue = new Rescue({
        name,
        status,
        admission,
        species,
        breed,
        colour,
        gender,
        age,
        location,
        imgUrl: filePath, // Saving the file path as imgUrl
      });

      try {
        await newRescue.save();
        res.status(201).json({
          message: "Rescue added successfully",
          newRescue,
        });

        console.log("New Rescue:", newRescue);
      } catch (saveError) {
        res.status(500).json({
          message: "Failed to save rescue",
          error: saveError.message,
        });
      }
    });
  } catch (error) {
    // Handle general errors
    res.status(400).json({
      message: "Failed to add rescue",
      error: error.message,
    });
  }
};


exports.deleterescues = async (req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    if (!id) {
      return res.status(400).json({
        msg: "rescue not found"
      })
    }

      const rescue = await Rescue.findByIdAndDelete(id);
      if (!rescue) {
        return res.status(400).json({
          msg: "rescues not found"
        })
    }
    return res.status(200).json({ msg: "rescue deleted successfully", rescue });

    
  } catch (error) {
     console.log(error);
     return res.status(500).json({ message: error.message });
  }
}
