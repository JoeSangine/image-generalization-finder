const mongoose = require("mongoose");

const FamousImageSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    FamousURL: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

});

module.exports = mongoose.model("FamousImage", FamousImageSchema);