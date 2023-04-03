const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors")
require('dotenv').config();
require("./config/db");
const multer = require("multer")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(function (request, response, next) {

  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  response.header("Access-Control-Allow-Credentials", true);
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, x-csrf-token, Accept, Authorization"
  );
  next();
});



// require router 
const countries = require("./router/countries");



// use router
app.use("/api",countries);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });





app.listen(process.env.PORT, async()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})