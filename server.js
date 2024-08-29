const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const {errorHandler} = require("./middleware/errormiddleware.js")
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload"); 


app.use(fileupload())
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;


// // animal recues 
const rescues = require("./Routes/rescuedAnimalRoute.js")
app.use("/rescues",rescues)

// Admin routes
const admin = require("./Routes/adminRoute.js");
app.use("/admin", admin);

// contactUser routes
const contactUser = require("./Routes/contactRoute.js");
app.use("/contactRoute", contactUser);

// donation routes
const Donation = require("./Routes/donationRoute.js");
app.use("/donate", Donation);

//volunteer Routes//search district wise volunteer
const volunteer= require("./Routes/volunteerRoutes.js")
app.use("/volunteers", volunteer)

//search district wise volunteer


//payment routes
const payment = require("./Routes/paymentRoutes.js")
app.use("/payment", payment)


const cloudinary = require("./DB_connection/cloudinary.js");
//cloudinary connection
cloudinary.cloudinaryConnect();

app.get("/", (req, res) => {
  // console.log("server is running");
  res.send("Server is running");
});

app.use(errorHandler)


// db connection
const connectDB = require("./DB_connection/configdb.js");
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
