const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const {
    createType,
    loadType,
    loadTypeById,
    deleteType,
    updateType
} = require("../controller/type");

router.post("/create-type",createType)

router.post("/load-type",loadType);

router.get("/load-type-by-id",loadTypeById);

router.delete("/delete-type",deleteType);

router.put("/update-type",updateType);




module.exports = router;