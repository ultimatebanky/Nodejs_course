const express = require("express");
const router = express.Router()
const path = require("path");
const handleNewUser = require('../controllers/registerController');

router.post("/", handleNewUser);

module.exports = router;