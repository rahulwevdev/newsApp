const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bannerSchema = new schema({

    createdOn: {type: Date, default:Date.now},

    title: String,
    link: String,
    newTab: {type:Boolean, default:true},
    alt: String,
    image: String,
    startDate: Date,
    expirationDate: Date,
    available: {type:Boolean, default: true},
    typeId: String,
    typeInfo: {type:mongoose.Schema.Types.ObjectId, ref:"type"},
    categoryId: {type:mongoose.Schema.Types.ObjectId, ref:"categories"}
});

bannerSchema.index({ 'typeId': 1});

const Banner = mongoose.model("banner", bannerSchema);

module.exports = Banner;
