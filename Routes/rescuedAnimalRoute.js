const express = require("express");

const router = express.Router();

const rescuedAnimalController = require("../controller/rescueAnimalController");

router.get("/", rescuedAnimalController.getrescuedAnimals);
router.post("/rescuedAnimals", rescuedAnimalController.addrescues);
router.delete("/rescuedAnimals/:id", rescuedAnimalController.deleterescues);


module.exports = router;
