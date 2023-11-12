import express from "express";
import Key from "../models/Key.js";

const router = express.Router();

// Route pour récupérer toutes les clefs
router.get("/keys", async (req, res) => {
  try {
    const keys = await Key.find();
    res.json(keys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer une clef par son ID
router.get("/keys/:id", async (req, res) => {
  try {
    const key = await Key.findById(req.params.id);
    res.json(key);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour créer une nouvelle clef
router.post("/keys", async (req, res) => {
  const key = new Key(req.body);
  try {
    const newKey = await key.save();
    res.status(201).json(newKey);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour mettre à jour une clef
router.patch("/keys/:id", async (req, res) => {
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

export default router;
