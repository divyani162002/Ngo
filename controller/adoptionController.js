const Adoption = require("../model/adoptionSchema");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;


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

function FileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };

  // options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.addadoptionDetails = async (req, res) => {
  try {
    const { species, breed, animaldetails, age, location } = req.body;

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

    
    try {
      console.log("Files Received ");

      const newadoptionDetail = new Adoption({
      species,
      breed,
      animaldetails,
      age,
      location,
      imgUrl: response.secure_url,
    });
      newadoptionDetail.save()
    
      return res
        .status(200)
        .json({ message: "adoption detail is created", newadoptionDetail });
    } catch (error) {
      console.log(error);
      res.status(500).send("server error- " + error);
    }

    //db me entry
    const fileData = await Adoption.create({
      species,
      breed,
      animaldetails,
      age,
      location,
      imgUrl: response.secure_url,
    });

    res.status(200).json({
      message: "Image successfully uploaded at",
      imgUrl: response.secure_url,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "adoption not created",
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