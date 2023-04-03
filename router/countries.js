const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const {loadCountriesTag} = require("../controller/countries")




router.get("/get-countries-tags",loadCountriesTag)

module.exports = router