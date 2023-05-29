const mongoose = require("mongoose");



const categoriesSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    // slug:{
    //     type:String
    // },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    tags: [],
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }

})



const categories = new mongoose.model("categories", categoriesSchema)

module.exports = categories