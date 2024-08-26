const express = require("express")

const router = express.Router()
const payment = require("../controller/paymentController")


router.get("/getkey", (req, res) => {
    res.status(200).json({
      key: process.env.RAZORPAY_KEY_ID,
    });
});
router.post("/createPayment", payment.createPayment);
router.post("/paymentVerification", payment.paymentVerification);




module.exports = router