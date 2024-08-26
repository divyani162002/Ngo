// const Admin = require("../model/adminSchema")
// // const asyncHandler  =require("express-async-handler")
 
// exports.adminSignup = async(req, res) => {
//     const { email, password } = req.body
//     try {
//         if (!email || !password) {
//             return res.status(404).json({ message: "pls enter email and password" })
//             //  throw new Error("Something went wrong!");
            
//         }
//         const admin = new Admin({
//             email,
//             password
//         })
//         await admin.save()
//         res.json({message:"admin is sucessfully signedup"})
//     } catch (error) {
//       return res.status(400).json({ message: "admin not found in database" })
//       //  throw new Error("Something went wrong!");
//     }
// }
// exports.adminLogin = async (req,res) => {
//     const { email, password } = req.body
//     try {
//             const admin = await Admin.findOne(Admin.email)
//             if (!admin) {
//            return res.status(400).json({ message: " admin not found" })
                
//         }
//         const password = await Admin.compare(password,admin.password)
//         if(!password)
//   return res.status(400).json({ message: "plz enter the correct password " })

//         if (password === password) {
//              return res.status(200).json({ message: "admin loogged in successfully" });
//         }

//     } catch (error) {
//         return res.json({error:error.message})
//     }
// }


const Admin = require("../model/adminSchema");
const bcrypt = require("bcrypt");
const jwt = require("../DB_connection/generateToken");

exports.adminSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Please enter email and password" });
    }

    const adminExist = await Admin.findOne({ email: email });
    if (adminExist) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10); // Hash the password
    const admin = new Admin({
      email,
      password: hashPassword, // Store hashed password
    });

    await admin.save();
      res.status(200).json({ message: "Admin is successfully signup" ,admin});
     
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during signup", error: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const matchPassword = await bcrypt.compare(password, admin.password);
    if (!matchPassword) {
      console.log("password in database", admin.password);
      return res.status(400).json({ message: "Password does not match" });
    }

    const token = jwt.generateToken({ email }); // Ensure function name is correct
    return res.status(200).json({ message: "Admin login successfully", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};






