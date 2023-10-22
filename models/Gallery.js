const mongoose = require("mongoose");

const Gallery = mongoose.model("Owner", {
  name: String,
  author: String,
  links: Boolean,
  socialsNetworks: Boolean,
  numberDownloads: Number,
  year: Number,
  picture: Object,
});

module.exports = Gallery;
