const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { check, body } = require("express-validator");
const router = express.Router();

// Middleware pour la validation des paramètres de création d'utilisateur
const validateUser = [
  check("username").notEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route pour récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer un utilisateur par son ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour créer un nouvel utilisateur
router.post("/", validateUser, handleValidationErrors, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hachez le mot de passe avant de le stocker dans la base de données
    const hash = await bcrypt.hash(password, 13);

    // Créez un nouvel utilisateur avec les données fournies
    const newUser = new User({
      username,
      email,
      password: hash,
    });

    // Enregistrez le nouvel utilisateur dans la base de données
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour mettre à jour un utilisateur
router.patch("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour supprimer un utilisateur
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
