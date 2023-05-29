const mongoose = require("mongoose");
const schema = mongoose.Schema;

const optionManagementSchema = new schema({
    optionName: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    delete: { type: Boolean, default: false },
    news: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "news"
    }]

})

const Option = mongoose.model("optionManagement", optionManagementSchema);
module.exports = Option;