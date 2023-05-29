const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const newsSchema = new mongoose.Schema({
    title:{type:String},
    subTitle:{type:String},
    image:{type:String},
    video:{type:String},
    content:{type:String},
    category:{
        cat: { type:mongoose.Schema.Types.ObjectId, ref: "categories" },
    subCate: { type:mongoose.Schema.Types.ObjectId, ref: "categories" },
    },
    active:{type:Boolean, default:true},
    createdAt:{ type: Date, default: Date.now },
    updateAt:{ type: Date, default: Date.now }
})


const news = new mongoose.model("news", newsSchema)

module.exports = news

