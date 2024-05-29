const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

//Routes for registration
router.post("/register", authController.registerUser);
//Routes for login
router.post("/login", authController.loginUser);

module.exports = router;
