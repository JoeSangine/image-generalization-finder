const mongoose = require("mongoose");

const BadImageSchema = new mongoose.Schema({

  BadURL: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

});

module.exports = mongoose.model("BadImage", BadImageSchema);
