
const Razorpay = require("razorpay");
const crypto= require("crypto")

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
exports.createPayment = async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({
      message: "Please enter the amount.",
    });
  }

  const options = {
    amount:Number(amount * 100), // amount in the smallest unit
    currency: "INR",
    receipt: "order_rcptid_" + Date.now(),
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order);
    res.status(201).json({ order });
  } catch (error) {
    console.error("Error in creating order:", error); //  full error
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};



//its works when we use checkiouthandler in front end
exports.paymentVerification = async (req, res) => {
    console.log(req.body)
    
     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
       return res.status(400).json({ message: "All fields are required." });
     }

     const generatedSignature = crypto
       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
       .update(razorpay_order_id + "|" + razorpay_payment_id)
       .digest("hex");

     if (generatedSignature === razorpay_signature) {
       return res
         .status(200)
         .json({
           success: true,
           message: "Payment signature verified successfully.",
         });
     } else {
       return res
         .status(400)
         .json({ success: false, message: "Invalid payment signature." });
     }

}
