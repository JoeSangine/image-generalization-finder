const mongoose = require("mongoose");

const BadImageSchema = new mongoose.Schema({

  BadURL: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("BadImage", BadImageSchema);
