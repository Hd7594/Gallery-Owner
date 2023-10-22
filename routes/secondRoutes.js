const express = require("express");
const router = express.Router();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUpload = require("express-fileupload");

const SecondPicture = require("../models/Second");

const convertToBase64 = require("../utils/convertToBase64");

router.post("/second-picture/add", fileUpload(), async (req, res) => {
  try {
    const { name, author, views, camera, owner } = req.body;

    const picture = req.files.picture;

    const finalPicture = await cloudinary.uploader.upload(
      convertToBase64(picture)
    );

    const secondGallery = new SecondPicture({
      name: name,
      author: author,
      views: views,
      camera: camera,
      picture: finalPicture,
      owner: owner,
    });
    console.log(secondGallery);
    await secondGallery.save();
    res.json(secondGallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/second-picture/collections", async (req, res) => {
  try {
    /*
    const pictureCollection = await SecondPicture.findById(req.query.id);
    if (!req.query.id) {
      return res.json({ message: "bad request" });
    }
    if (req.query.id) {
      res.json(pictureCollection);
    }
*/
    const picturesList = await SecondPicture.find();
    res.json(picturesList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
