const mongoose = require("mongoose");
const schema = mongoose.Schema;

const typeSchema = new schema({
    typeId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    published: { type: Boolean, default: true }
});

const Type = mongoose.model("type", typeSchema);

module.exports = Type;