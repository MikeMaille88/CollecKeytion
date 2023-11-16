const express = require("express");
const Key = require("../models/keyModel");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// Configuration de stockage des fichiers téléchargés
const fileStorage = multer.diskStorage({
  destination: "../vite-project/src/images",
  // Répertoire de destination pour les fichiers téléchargés
  filename: (req, file, cb) => {
    console.log("filestorage");
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Configuration de l'instance Multer pour le téléchargement de fichiers
const uploadImage = multer({
  storage: fileStorage,
  limits: {
    fileSize: 10000000, // Limite de taille maximale de fichier (10 Mo)
  },
  fileFilter(req, file, cb) {
    console.log(file);
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      console.log("uploadimage");
      return cb(
        new Error(
          "Veuillez télécharger un fichier avec une extension jpg ou png."
        )
      );
    }
    cb(null, true);
  },
});

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
router.post("/", uploadImage.single("image"), async (req, res) => {
  try {
    if (req.file) {
      const keyData = {
        name: req.body.name,
        price: req.body.price,
        limited: req.body.limited,
        land: req.body.land,
        image: req.file.filename,
      };
      const key = await Key.create(keyData);
      res.status(200).json(key);
    } else {
      res.status(400).json({ message: "Aucune image n'a été téléchargée." });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route pour mettre à jour une clef
router.patch("/:id", async (req, res) => {
  try {
    const updatedKey = await Key.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedKey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour supprimer une clef
router.delete("/keys/:id", async (req, res) => {
  try {
    await Key.findByIdAndDelete(req.params.id);
    res.json({ message: "Key deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
