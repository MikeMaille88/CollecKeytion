/**
 * keyRoutes.js
 * 
 * Ce fichier définit toutes les routes API liées à la gestion des clefs Disney (produits).
 * Il implémente les opérations CRUD (Create, Read, Update, Delete) pour les clefs
 * et gère le téléchargement d'images vers Cloudinary avec une validation des fichiers.
 * 
 * Les fonctionnalités incluent:
 * - Configuration de multer pour la gestion des téléchargements de fichiers
 * - Validation des types de fichiers images (png, jpg, JPG)
 * - Téléchargement d'images multiples vers Cloudinary avec organisation en dossiers
 * - Limitations de taille de fichier (10 Mo maximum)
 * - Journalisation des opérations pour faciliter le debugging
 */

const express = require("express");
const Key = require("../models/keymodel");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../cloudinary");


// Configuration du stockage des fichiers temporaires en mémoire
// et validation des types d'images acceptés (png, jpg, JPG)
// avec une limite de taille à 10 Mo
const storage = multer.memoryStorage(); 

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, // Limite de taille maximale de fichier (10 Mo)
  },
  fileFilter(req, file, cb) {
    console.log(file);
    if (!file.originalname.match(/\.(png|jpg|JPG)$/)) {
      console.log("uploadimage");
      return cb(
        new Error(
          "Veuillez télécharger un fichier avec une extension jpg/JPG ou png."
        )
      );
    }
    cb(null, true);
  },
});

router.get("/", async (req, res) => {
  console.log("GET /keys route hit");
  try {
    const keys = await Key.find();
    res.json(keys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  console.log(`GET /keys/${req.params.id} route hit`);
  try {
    const key = await Key.findById(req.params.id);
    res.json(key);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post(
  "/",
  uploadImage.fields([
    { name: "boxFront", maxCount: 1 },
    { name: "boxBack", maxCount: 1 },
    { name: "inBox", maxCount: 1 },
    { name: "withoutBox", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("POST /keys route hit");
    try {
      // URL fixe du placeholder déjà sur Cloudinary
      const placeholderUrl = "https://res.cloudinary.com/colleckeytion/image/upload/v1741006301/CollecKeytion/others/key_placeholder.jpg";
      
      // Tableau pour stocker les URLs des images (par défaut le placeholder)
      const imageUrls = {
        boxFront: placeholderUrl,
        boxBack: placeholderUrl,
        inBox: placeholderUrl,
        withoutBox: placeholderUrl,
        banner: placeholderUrl
      };

      // Ne télécharger que les fichiers qui existent réellement
      const uploadPromises = [];
      
      // Pour chaque type de champ, vérifier s'il existe
      for (const fieldName in req.files) {
        if (req.files[fieldName] && req.files[fieldName][0]) {
          const file = req.files[fieldName][0];
          console.log(`Processing file for ${fieldName}:`, file); // Log complet du fichier pour debug
          
          // Vérifier si nous avons un buffer (memoryStorage) ou un path (diskStorage)
          if (file.buffer) {
            // Utilisation de buffer avec memoryStorage
            console.log(`Uploading ${fieldName} from buffer`);
            const b64 = Buffer.from(file.buffer).toString("base64");
            const dataURI = "data:" + file.mimetype + ";base64," + b64;
            
            const uploadPromise = cloudinary.uploader.upload(dataURI, {
              folder: `CollecKeytion/${fieldName}`,
            }).then(result => {
              imageUrls[fieldName] = result.secure_url;
            });
            
            uploadPromises.push(uploadPromise);
          } 
          else if (file.path) {
            // Utilisation de path avec diskStorage
            console.log(`Uploading ${fieldName} from path: ${file.path}`);
            const uploadPromise = cloudinary.uploader.upload(file.path, {
              folder: `CollecKeytion/${fieldName}`,
            }).then(result => {
              imageUrls[fieldName] = result.secure_url;
            });
            
            uploadPromises.push(uploadPromise);
          }
          else {
            console.error(`Neither buffer nor path found for ${fieldName}`);
          }
        }
      }

      // Attendre que tous les uploads soient terminés
      await Promise.all(uploadPromises);
      
      // Créer l'objet keyData avec les URLs
      const keyData = {
        name: req.body.name,
        price: req.body.price,
        limited: req.body.limited,
        land: req.body.land,
        releaseDate: req.body.releaseDate,
        image: {
          boxFront: imageUrls.boxFront,
          boxBack: imageUrls.boxBack,
          inBox: imageUrls.inBox,
          withoutBox: imageUrls.withoutBox,
        },
        description: req.body.description,
        banner: imageUrls.banner,
      };

      const key = await Key.create(keyData);
      res.status(200).json(key);
      
    } catch (error) {
      console.error("Detailed error:", error);
      res.status(500).json({ message: error.message });
    }
  }
);



router.patch("/:id", uploadImage.single("image"), async (req, res) => {
  console.log(`PATCH /keys/${req.params.id} route hit`);
  try {
    let updatedKeyData = req.body;

    if (req.file) {
      updatedKeyData.image = req.file.filename;
    }

    const updatedKey = await Key.findByIdAndUpdate(
      req.params.id,
      updatedKeyData,
      {
        new: true,
      }
    );

    res.json(updatedKey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  console.log(`DELETE /keys/${req.params.id} route hit`);
  try {
    await Key.findByIdAndDelete(req.params.id);
    res.json({ message: "Key deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
