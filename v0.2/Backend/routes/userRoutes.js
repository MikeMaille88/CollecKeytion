//userRoutes.js
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

    // Recherchez l'utilisateur par son email
    const user = await User.findOne({ email });

    // Vérifiez si l'utilisateur existe
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Utilisez bcrypt pour comparer les mots de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Génère un jeton d'authentification et le renvoie au client
      const authToken = user.generateAuthTokenAndSaveUser();
      res.json({ authToken, userId: user._id });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route pour supprimer un utilisateur
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
