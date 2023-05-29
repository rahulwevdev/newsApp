const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const {
    loadProfile
} = require("../controller/admin");

router.get("/load-profile",loadProfile);


module.exports = router;