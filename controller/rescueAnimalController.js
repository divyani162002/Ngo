const Rescue = require("../model/rescuedAnimalSchema");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

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




function FileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };

  // options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
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
    } = req.body;

    const file = req.files.file;
    console.log(file);

    const supportedType = ["jpg", "jpeg", "png", "pdf"];

    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file Type", fileType);

    if (!FileTypeSupported(fileType, supportedType)) {
      return res.status(400).json({ message: "file formate not supported" });
    }

    //upload file to cloudinary
    const response = await uploadFileToCloudinary(file, "ngo_photos");
    console.log(response);

    //

    try {
      console.log("Files Received ");

      
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
        imgUrl: response.secure_url,
      });

      // Save the new rescue to the database
      await newRescue.save();

      return res
        .status(200)
        .json({ message: "rescue added successfully", newRescue });
    } catch (error) {
      console.log(error);
      res.status(500).send("server error- " + error);
    }
    //db me entry
    const fileData = await Rescue.create({
      name,
            status,
            admission,
            species,
            breed,
            colour,
            gender,
            age,
            location,
      imgUrl: response.secure_url,
    });

    res.status(200).json({
      message: "Image successfully uploaded at",
      imgUrl: response.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};



exports.deleterescues = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({
        msg: "rescue not found",
      });
    }

    const rescue = await Rescue.findByIdAndDelete(id);
    if (!rescue) {
      return res.status(400).json({
        msg: "rescues not found",
      });
    }
    return res.status(200).json({ msg: "rescue deleted successfully", rescue });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
