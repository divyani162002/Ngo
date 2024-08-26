const express = require("express");

const router = express.Router();
const donations = require("../controller/donationController");

router.get("/", donations.alldoners);
router.post("/donation", donations.donate);

module.exports = router;
