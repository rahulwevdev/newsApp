const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const {
    postNews,
    uploadNewsVideo,
    loadNews,
    deleteNews,
    uploadImage
  
} = require("../controller/news");

const path = require("path");
const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination:"public/videos",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now())+
        path.extname(file.originalname)
    }
})

const fileStorage1 = multer.diskStorage({
    destination:"public/banner",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now())+
        path.extname(file.originalname)
    }
})

const uploadVideo = multer({
    storage:fileStorage
})

const uploadImage1 = multer({
    storage:fileStorage1
})

router.post("/post-news",postNews);
router.post("/upload-image",uploadImage1.single("image"),uploadImage)

router.post("/upload-news-video",uploadVideo.single("video"),uploadNewsVideo);

router.post("/load-news",loadNews);

router.delete("/delete-news",deleteNews);

router.put("/update-news",updateNews);




module.exports = router;