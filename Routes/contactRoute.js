const express = require("express");

const router = express.Router();

const userController = require("../controller/contactUserController");

router.get("/", userController.getContactUser);
router.post("/contactuser", userController.addContactUser);
router.post("/contactuser/:id", userController.deleteContactUser);

module.exports = router;
