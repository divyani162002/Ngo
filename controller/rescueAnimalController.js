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





// exports.addrescues = async (req, res) => {
//   const {
//     name,
//     status,
//     admission,
//     species,
//     breed,
//     colour,
//     gender,
//     age,
//     location,
//   } = req.body;

//   try {
//     // Check if files were uploaded
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     // Get the uploaded file
//     const file = req.files.imgUrl; // Ensure the file key is 'file'

//     // Define upload directory
//     const uploadDir = path.join(__dirname, "..", "uploads"); // Make sure this path exists

//     // Create directory if not exists
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }

//     // Define the file path where it will be saved
//     const filePath = path.join(uploadDir, Date.now() + "_" + file.name);

//     // Move the file to the upload directory
//     file.mv(filePath, async (error) => {
//       if (error) {
//         return res.status(500).json({
//           message: "Error saving file",
//           error,
//         });
//       }

//       // Create a new Rescue record
//       const newRescue = new Rescue({
//         name,
//         status,
//         admission,
//         species,
//         breed,
//         colour,
//         gender,
//         age,
//         location,
//         imgUrl: filePath,
       
//         // Save the file path in the database
//       });

//       // Save the new rescue to the database
//       await newRescue.save();

//       // Send success response
//       return res.status(200).json({
//         message: "Rescue added successfully",
//         newRescue,
//       });
//     });
//   } catch (error) {
//     // Handle errors
//     return res.status(400).json({
//       message: "Failed to add rescue",
//       error: error.message,
//     });
//   }
// };

// exports.imageUpload = async (req, res) => {
//   try {
//     const {
//       name,
//       status,
//       admission,
//       species,
//       breed,
//       colour,
//       gender,
//       age,
//       location,
//     } = req.body;

//     const file = req.files.imgFile;

//     const supportedTypes = ["jpg", "jpeg", "png", "pdf"];

//     const fileType = file.name.split(".")[1].toLowerCase();

//     if (!isFileTypeSupported(fileType, supportedTypes)) {
//       return res.status(400).json({ message: "file formate not supported" });
//     }

//     //upload file to cloudinary
//     const response = await uploadFileToCloudinary(file, "ngo_photos");

//     // db me entry

//     res.status(200).json({
//       message: "Image successfully uploaded at",
//       imgUrl: response.secure_url,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };


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

    const file = req.files.imageFile;
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
