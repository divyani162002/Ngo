const Donation = require("../model/donationForm")


    
//   exports.alldoners = async (req, res) => {
//     try {
//       const doners = await Donation.find();
//       res.json({ doners });
//     } catch (error) {
//       res.status(400).json({ message: "Doners not found" });
//     }
//   };
// exports.alldoners = async (req, res) => {
//   try {
//     console.log("Fetching all donors");

//     // Find all documents in the Donation collection
//     const doners = await Donation.find();

//     console.log("Donors found:", doners);

//     // Send the found donors as JSON
//     res.json({ doners });
//   } catch (error) {
//     console.error("Error fetching donors:", error.message);

//     // Send an error response with status 400
//     res.status(400).json({ message: "Donors not found", error: error.message });
//   }
// };


exports.alldoners = async (req, res) => {
  try {
    console.log("Fetching all donors");

    // Find all documents in the Donation collection
    const doners = await Donation.find();

    console.log("Donors found:", doners);

    // Send the found donors as JSON
    return res.json({ doners }); // Use return to avoid further execution
  } catch (error) {
    console.error("Error fetching donors:", error.message);

    // Check if headers are already sent
    if (!res.headersSent) {
      // Send an error response with status 400
      return res
        .status(400)
        .json({ message: "Donors not found", error: error.message });
    }
  }
};




// exports.donate = async (req, res) => {
//     const { name, email, phone, amount, donateto, message } = req.body
//     try {
//         const DonationDetails = new Donation({
//             name,
//             email,
//             phone,
//             amount,
//             donateto,
//             message
//         })
//         await DonationDetails.save()
//         res.status(200).json({
//             message: " user is created",
//              DonationDetails
//          });
//          res.json({DonationDetails});
//     } catch (error) {
//          res.status(400).json({
//            message: "user not found",
//          });
//     }
     
// }
exports.donate = async (req, res) => {
  const { name, email, phone, amount, donateto, message } = req.body;

  try {
    const donationDetails = new Donation({
      name,
      email,
      phone,
      amount,
      donateto,
      message,
    });

    await donationDetails.save();

    // Send only one response
    return res.status(200).json({
      message: "User is created",
      donationDetails,
    });
  } catch (error) {
    // Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(400).json({
        message: "User not created",
        error: error.message,
      });
    }
  }
};
