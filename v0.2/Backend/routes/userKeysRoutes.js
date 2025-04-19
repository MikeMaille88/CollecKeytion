/**
 * userKeysRoutes.js
 * 
 * Ce fichier définit toutes les routes API liées à la gestion des relations 
 * entre utilisateurs et clefs Disney (collection personnelle).
 * Il gère les associations entre utilisateurs et produits, permettant de suivre
 * quelles clefs sont possédées par quels utilisateurs.
 * 
 * Les fonctionnalités incluent:
 * - Consultation des relations utilisateur-clef avec filtrage flexible
 * - Création de nouvelles relations (ajout d'une clef à une collection)
 * - Mise à jour du statut des relations (ex: changement de possession)
 * - Suppression de relations (retrait d'une clef d'une collection)
 */

const express = require("express");
const { UserKeys } = require("../models/userkeysmodel");

const router = express.Router();

// Route pour récupérer les relations utilisateur-clef
router.get("/", async (req, res) => {
  try {
    const { userId, keyId } = req.query;

    // Requête pour récupérer une relation unique si userId et keyId sont fournis
    if (userId && keyId) {
      const userKey = await UserKeys.findOne({ userId: userId, keyId: keyId });

      // Vérifie si la relation existe
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

    // Requête pour récupérer toutes les relations utilisateur-clef si ni userId ni keyId ne sont fournis
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
