const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const {
    postBanner,
    loadBanner,
    loadBannerById,
    deleteBanner,
    updateBanner
} = require("../controller/banner");

const path = require("path");
const multer = require("multer")

const fileStorage = multer.diskStorage({
    destination:"public/banner",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now())+
        path.extname(file.originalname)
    }
})

const uploadImage = multer({
    storage:fileStorage
})

router.post("/post-banner",postBanner);

router.post("/load-banner",loadBanner);

router.get("/load-banner-by-id",loadBannerById);

router.delete("/delete-banner",deleteBanner);

router.put("/update-banner",uploadImage.single("image"),updateBanner);




module.exports = router;