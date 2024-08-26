const express = require("express");

const router = express.Router();

const userController = require("../controller/contactUserController");

router.get("/", userController.getContactUser);
router.post("/contactuser", userController.addContactUser);

module.exports = router;
