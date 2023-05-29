const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const {register,verifyEmail,forgotPassword,login,logout,resetPassword} = require("../controller/authentication")
const {auth} = require("../middleware/auth")
// const {middlewareValidation,schemas} = require("../middleware/validation");
const cookieParser  = require("cookie-parser");
router.use(cookieParser())


router.get("/register",async(request,response)=>{
    
    response.render("register")
})

router.post("/register",register);

router.get("/verify-email",verifyEmail);

router.get("/login",async(request,response)=>{
    return response.render("login")
});

router.post("/login",login);

router.get("/logout",auth(),logout);

router.post("/forgot-password",forgotPassword);

router.post("/reset-password",resetPassword);

module.exports = router