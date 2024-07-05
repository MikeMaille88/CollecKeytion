const express = require("express");
const Key = require("../models/keymodel");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration de l'instance Multer pour le téléchargement de fichiers
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'CollecKeytion',
    format: async (req, file) => 'png' || 'jpg', // Format de fichier autorisé
    public_id: (req, file) => file.fieldname + "_" + Date.now(), // Nom du fichier sur Cloudinary
  },
});

const uploadImage = multer({ storage: storage });

// Route pour récupérer toutes les clefs
router.get("/", async (req, res) => {
  try {
    const keys = await Key.find();
    res.json(keys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer une clef par son ID
router.get("/:id", async (req, res) => {
  try {
    const key = await Key.findById(req.params.id);
    res.json(key);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour créer une nouvelle clef
router.post(
  "/",
  uploadImage.fields([
    { name: "boxFront", maxCount: 1 },
    { name: "boxBack", maxCount: 1 },
    { name: "inBox", maxCount: 1 },
    { name: "withoutBox", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const images = Object.values(req.files).map(fileArray => fileArray[0].path);

      const keyData = {
        name: req.body.name,
        price: req.body.price,
        limited: req.body.limited,
        land: req.body.land,
        image: {
          boxFront: images[0],
          boxBack: images[1],
          inBox: images[2],
          withoutBox: images[3],
        },
        description: req.body.description,
      };

      const key = await Key.create(keyData);
      res.status(200).json(key);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

// Route pour mettre à jour une clef
router.patch("/:id", uploadImage.single("image"), async (req, res) => {
  try {
    let updatedKeyData = req.body;

    if (req.file) {
      updatedKeyData.image = req.file.path;
    }

    const updatedKey = await Key.findByIdAndUpdate(req.params.id, updatedKeyData, {
      new: true,
    });

    res.json(updatedKey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour supprimer une clef
router.delete("/:id", async (req, res) => {
  try {
    await Key.findByIdAndDelete(req.params.id);
    res.json({ message: "Key deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
