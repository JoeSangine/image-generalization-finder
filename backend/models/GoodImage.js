const mongoose = require("mongoose");

const GoodImageSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    url: {
            type: String,
            required: true,
    },
    cloudinaryId: {
            type: String,
            required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: { updatedAt: true }});

module.exports = mongoose.model("GoodImage", GoodImageSchema);