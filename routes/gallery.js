const express = require("express");
const router = express.Router();

const fileUpload = require("express-fileupload");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const convertToBase64 = require("../utils/convertToBase64");

const Gallery = require("../models/Gallery");

router.post("/picture/publication", fileUpload(), async (req, res) => {
  try {
    const { name, author, links, socialsNetworks, numberDownloads, year } =
      req.body;

    const picture = req.files.picture;

    const finalPicture = await cloudinary.uploader.upload(
      convertToBase64(picture)
    );

    const newGallery = new Gallery({
      name: name,
      author: author,
      links: links,
      socialsNetworks: socialsNetworks,
      numberDownloads: numberDownloads,
      year: year,
      picture: finalPicture,
    });
    console.log(newGallery);
    await newGallery.save();
    res.json(newGallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/picture/list", async (req, res) => {
  try {
    const pictureList = await Gallery.find();
    res.json(pictureList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/picture/delete", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.body.id);
    if (req.body.id) {
      res.status(200).json({ message: "picture deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
