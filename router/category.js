const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const {
    createCategory,
    loadCategory,
    loadCategoryById,
    deleteCategory,
    updateCategory
} = require("../controller/category");

router.post("/create-category",createCategory);

router.post("/load-category",loadCategory);

router.get("load-category-by-id",loadCategoryById);

router.delete("delete-category",deleteCategory);

router.put("update-category",updateCategory);




module.exports = router;