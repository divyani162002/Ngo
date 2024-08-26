const Donation = require("../model/donationForm")

exports.alldoners = async (req,res) => {
    
    try {
        const doners = await Donation.find()
        res.json({ doners })
        
    } catch (error) {
        res.status(400).json({message:"doners not found"})
    }

}

exports.donate = async (req, res) => {
    const { name, email, phone, amount, donateto, message } = req.body
    try {
        const DonationDetails = Donation.create({
            name,
            email,
            phone,
            amount,
            donateto,
            message
        })
         res.status(200).json({ message: " user is created" });
         res.json({DonationDetails});
    } catch (error) {
         res.status(400).json({
           message: "user not found",
         });
    }
     
}