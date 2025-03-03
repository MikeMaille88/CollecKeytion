//userRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/usermodel");
const UserKeys = require("../models/userkeysmodel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");
const { forgetPassword, resetPassword } = require('../controllers/forgetPassword.controller');
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
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
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

// Route pour se connecter (authentification)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Début de la connexion");

    const user = await User.findOne({ email });
    console.log("Utilisateur trouvé :", user);

    if (!user) {
      console.log("Identifiants invalides");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Mot de passe vérifié :", passwordMatch);

    if (passwordMatch) {
      const authToken = await user.generateAuthTokenAndSaveUser();
      console.log("Jeton généré :", authToken);

      await User.updateOne(
        { _id: user._id },
        { $set: { authTokens: [{ authToken }] } }
      );

      console.log("Jeton sauvegardé avec succès");
      res.json({ authToken, userId: user._id });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Erreur :", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Routes pour mettre à jour un mdp oublié
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword/:token', resetPassword);


// Route pour mettre à jour un utilisateur
router.patch("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Vérifie si l'ID de l'utilisateur est valide
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Vérifie si le corps de la requête n'est pas vide
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    // Vérifie si l'utilisateur a été trouvé et mis à jour
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User modified", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour supprimer un utilisateur et ses clés associées
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Vérifie si l'ID est valide
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }

    // Convertir userId en ObjectId
    const objectIdUser = new mongoose.Types.ObjectId(userId);

    // 🔥 Supprimer toutes les entrées userkeys associées à cet utilisateur
    // const deletedKeys = await UserKeys.deleteMany({ userId: objectIdUser });
    // console.log(`${deletedKeys.deletedCount} userKeys supprimées pour l'utilisateur ${userId}`);

    // 🔥 Supprimer l'utilisateur
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});


module.exports = router;
