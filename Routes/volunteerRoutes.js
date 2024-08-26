const express = require("express")
const router = express.Router()

const volunteerController = require("../controller/volunteerController")

router.get("/", volunteerController.getVolunteer)
router.post("/volunteer", volunteerController.addVolunteer);
router.get("/searchVolunteer", volunteerController.searchVolunteer)
router.delete("/volunteer/:id",volunteerController.deleteVolunteer)


module.exports=router 