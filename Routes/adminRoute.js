const express = require("express");

const router = express.Router();
const adminController = require("../controller/adminController");

router.post("/signup", adminController.adminSignup);
router.post("/login", adminController.adminLogin);

module.exports = router;
