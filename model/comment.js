const mongoose = require("mongoose");

require('dotenv').config();

const commentSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "news" },
    comment:{type:String},
    name:{type:String},
    email:{type:String},
    createdAt:{ type: Date, default: Date.now },
    updateAt:{ type: Date, default: Date.now }
})


const comment = new mongoose.model("comment", commentSchema)

module.exports = comment

