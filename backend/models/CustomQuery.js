const mongoose = require("mongoose");

const CustomQuerySchema = new mongoose.Schema({
    originalQuery: {
        type: String,
        required: true
    },
    convertedQuery: {
        type: String,
        required: false,
    },
    image: {
        type: {
            url: {
                type: String,
                required: true,
            },
            cloudinaryId: {
                type: String,
                required: false,
            }
        },
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("CustomQuery", CustomQuerySchema);