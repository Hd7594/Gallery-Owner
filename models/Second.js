const mongoose = require("mongoose");

const SecondPicture = mongoose.model("Second-Picture", {
  name: String,
  author: String,
  views: Number,
  camera: String,
  picture: Object,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gallery",
  },
});

module.exports = SecondPicture;
