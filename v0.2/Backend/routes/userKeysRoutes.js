import express from "express";
import UserKeys from "../models/UserKeys.js";

const router = express.Router();

// Route pour récupérer toutes les relations utilisateur-clef
router.get("/userkeys", async (req, res) => {
  try {
    const userKeys = await UserKeys.find();
    res.json(userKeys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour créer une nouvelle relation utilisateur-clef
router.post("/userkeys", async (req, res) => {
  const userKey = new UserKeys(req.body);
  try {
    const newUserKey = await userKey.save();
    res.status(201).json(newUserKey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour mettre à jour une relation utilisateur-clef
router.patch("/userkeys/:id", async (req, res) => {
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
router.delete("/userkeys/:id", async (req, res) => {
  try {
    await UserKeys.findByIdAndDelete(req.params.id);
    res.json({ message: "UserKey deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
