
const User = require("../model/contactUserSchema");

exports.getContactUser = async (req, res) => {
  try {
    const user = await User.find();
    res.json({ user });
  } catch (err) {
    res.status(400).json({
      message: "user not found",
    });
  }
};

exports.addContactUser = async (req, res) => {
  const { name, email, subject, message, location } = req.body;

  try {
    // Create a new user object
    const newContactUser = new User({
      name,
      email,
      subject,
      message,
      location,
    });

    // Save the new user to the database
    await newContactUser.save();

    // Send a single response
    res.status(201).json({
      message: "User is created",
      newContactUser,
    });
  } catch (error) {
    // Handle any errors
    res.status(400).json({
      message: "User not created",
      error: error.message,
    });
  }
};

exports.deleteContactUser =async (req,res) => {
  try {
   
    const id = req.params.id
    console.log(id)
    if (!id) {
      return res.status(400).json({
        msg: "rescue not found"
      })
    }
   
    const user = await User.findByIdAndDelete(id);
     if (!user) {
       return res.status(400).json({
         msg: "users not found",
       });
     }
     return res
       .status(200)
       .json({ msg: "users deleted successfully", user });


  } catch (error) {
    console.log(error);
     return res.status(500).json({ message: error.message });
  }
  


}