/*
L'objectif de ce projet était d'utiliser la clé owner dans le deuxième modèle et le deuxième fichier de mes routes pour montrer que toutes ces photos appartiennent au même utilisateur. Pour rendre cela plus applicable , j'ai utilisé des photos du même auteur sur pexels.com 
*/
require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const ownerGalleryRoutes = require("./routes/gallery");
app.use(ownerGalleryRoutes);

const secondGalleryRoutes = require("./routes/secondRoutes");
app.use(secondGalleryRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("server is started");
});
