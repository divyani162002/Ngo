const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secretkey = process.env.secret_Key;

exports.generateToken = (userId) => {
  const payload = {
    userId: userId,
  };

  return jwt.sign(payload, secretkey, { expiresIn: "1hr" });
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretkey);
    return decoded.userId;
  } catch (error) {
    return res.status(404).json({ message: "token not verify" });
  }
};
