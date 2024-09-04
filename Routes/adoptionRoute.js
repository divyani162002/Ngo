const express = require("express")
const router = express.Router()

const adoptionController = require("../controller/adoptionController")

router.get("/",adoptionController.getAdoptionDetails);
router.post("/adoptionDetails", adoptionController.addadoptionDetails);
router.delete("/adoptionDetails/:id",adoptionController.deleteadoptionDetails);
module.exports = router