
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

// exports.addContactUser = async (req, res) => {
//   const { name, email, subject, message, location } = req.body;
//   ;

//     try {
//         const newContactUser = await new User(
//           {
//             name,
//                 email,
//                 subject,
//                 message,
//                 location
//           },
//         );
//      res.status(200).json({ message: " user is created" });
//       console.log(newContactUser)
//       res.json({newContactUser})

//     const newUser = new User([
//       {
//         name,
//         email,
//         subject,
//         message,
//       },
//     ]);
//     await newUser.save();
//     res.status(200).json({ message: " user is created" },new);
//   } catch (error) {
//     res.status(400).json({
//       message: "user not found",
//     });
//   }
// };
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
