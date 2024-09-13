const Volunteer = require("../model/volunteerSchema");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

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

// exports.addVolunteer = async (req, res) => {
//   const { name, joining, gender, age,phoneNumber, district, imgUrl } = req.body;

//   try {
//     // Create a new entry
//     console.log("file recieved", req.files);
//     if (!req.files || !req.files.file) {
//       return res.status(400).json({
//         message: "no file uploaded",
//       });
//     }

//     const file = req.files.file;
//     const uploadDir = path.join(__dirname, "files");

//     // Create the directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }

//     const filePath = path.join(uploadDir, Date.now() + "_" + file.name);

//     file.mv(filePath, (error) => {
//       if (error) {
//         return res
//           .status(500)
//           .json({ message: "Error saving file in volunteer", error });
//       }

//       const newVolunteer = new Volunteer({
//         name,
//         joining,
//         gender,
//         age,
//         phoneNumber,
//         district,
//         imgUrl: filePath,
//       });
//       newVolunteer.save();
//       res.status(201).json({
//         message: "volunteer added successfully",
//         newVolunteer,
//       });
//       console.log(newVolunteer);
//     });
//   } catch (error) {
//     // Handle errors and send an appropriate response
//     res.status(400).json({
//       message: "Failed to add volunteer",
//       error: error.message, // Optionally include the error message for debugging
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

exports.addVolunteer = async (req, res) => {
  try {
    const { name, joining, gender, age, phoneNumber, district, imgUrl } =
      req.body;

    const file = req.files.filge;
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

      const newVolunteer = new Volunteer({
        name,
        joining,
        gender,
        age,
        phoneNumber,
        district,
        imgUrl: response.secure_url,
      });

      newVolunteer.save();
      return res
        .status(200)
        .json({ message: "volunteer added successfully", newVolunteer });
    } catch (error) {
      console.log(error);
      res.status(500).send("server error- " + error);
    }
    //db me entry
    const fileData = await Volunteer.create({
      name,
      joining,
      gender,
      age,
      phoneNumber,
      district,
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
      message: "Failed to add volunteer",
    });
  }
};

exports.deleteVolunteer = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    if (!id) {
      return res.status(400).json({
        msg: "id not found",
      });
    }
    const volunteer = await Volunteer.findByIdAndDelete(id);
    if (!volunteer) {
      return res.status(400).json({
        msg: "volunteer not found",
      });
    }
    return res
      .status(200)
      .json({ msg: "volunteer deleted successfully", volunteer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.searchVolunteer = async (req, res) => {
  try {
    const { district } = req.query;

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
};
