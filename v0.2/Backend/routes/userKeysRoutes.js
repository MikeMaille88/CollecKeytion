//userKeysRoutes.js
const express = require("express");
const { UserKeys } = require("../models/userKeysModel");

const router = express.Router();

// Route pour récupérer les relations utilisateur-clé
router.get("/", async (req, res) => {
  try {
    const { userId, keyId } = req.query;

    // Requête pour récupérer une relation unique si userId et keyId sont fournis
    if (userId && keyId) {
      const userKey = await UserKeys.findOne({ userId: userId, keyId: keyId });

      // Vérifiez si la relation existe
      if (!userKey) {
        return res.status(404).json({
          message: "La relation utilisateur-clé n'a pas été trouvée.",
        });
      }

      return res.json(userKey);
    }

    // Requête pour récupérer toutes les relations liées à un utilisateur si seulement userId est fourni
    if (userId) {
      const userKeys = await UserKeys.find({ userId: userId, possess: true });
      return res.json(userKeys);
    }

    // Requête pour récupérer toutes les relations utilisateur-clé si ni userId ni keyId ne sont fournis
    const allUserKeys = await UserKeys.find();
    return res.json(allUserKeys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour créer une nouvelle relation utilisateur-clef
router.post("/", async (req, res) => {
  const userKey = new UserKeys(req.body);
  try {
    const newUserKey = await userKey.save();
    res.status(201).json(newUserKey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour mettre à jour une relation utilisateur-clef
router.patch("/:id", async (req, res) => {
  try {
    const updatedUserKey = await UserKeys.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUserKey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour supprimer une relation utilisateur-clef
router.delete("/:id", async (req, res) => {
  try {
    await UserKeys.findByIdAndDelete(req.params.id);
    res.json({ message: "UserKey deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
