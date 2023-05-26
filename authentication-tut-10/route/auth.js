const express = require("express");
const router = express.Router()
const path = require("path");
const handleLogin = require("../controllers/authController")

router.post("/", handleLogin);

module.exports = router;