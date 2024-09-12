const express = require("express");

const router = express.Router();
const {
  getrescuedAnimals,
  deleterescues,
  imageUpload,
} = require("../controller/rescueAnimalController");

router.get("/", getrescuedAnimals);
router.post("/rescuedAnimals", imageUpload); //imageUpload
router.delete("/rescuedAnimals/:id", deleterescues);

module.exports = router;
