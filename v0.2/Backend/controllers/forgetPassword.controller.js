/**
 * forgetPassword.controller.js
 * 
 * Ce fichier définit les contrôleurs pour la gestion du processus de réinitialisation
 * de mot de passe oublié. Il contient deux fonctions principales : une pour demander
 * la réinitialisation et une autre pour appliquer le nouveau mot de passe.
 * 
 * Les fonctionnalités incluent:
 * - Génération de tokens JWT sécurisés pour la réinitialisation
 * - Envoi d'emails via Nodemailer avec liens de réinitialisation
 * - Vérification des tokens et mise à jour sécurisée des mots de passe
 * - Journalisation détaillée pour faciliter le debugging
 * - Gestion des erreurs pour chaque étape du processus
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Contrôleur qui gère la demande de réinitialisation de mot de passe
// 1. Vérifie l'existence de l'email dans la base de données
// 2. Génère un token JWT valide 10 minutes contenant l'ID de l'utilisateur
// 3. Envoie un email avec un lien de réinitialisation contenant ce token
const forgetPassword = async (req, res) => {
    try {
      console.log("Requête reçue :", req.body);
      // Find the user by email
      const { email, frontendUrl } = req.body;
      console.log("Recherche de l'email :", email); 
      const user = await User.findOne({ email });
      console.log("Résultat MongoDB :", user);

  
      // If user not found, send error message
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Generate a unique JWT token for the user that contains the user's id
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "10m",});

      console.log("Token généré :", token); // 🔍 Vérifie si le token est bien généré
  
      // Send the token to the user's email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_APP_EMAIL,
        },
      });
  
      // Email configuration
      const resetUrl = `${frontendUrl}/reset/${token}`;
      console.log("URL de réinitialisation :", resetUrl);

      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "CollecKeytion - Reset Password",
        html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="${resetUrl}">Reset Your Password</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: "Email sent" });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  // Contrôleur qui valide le token de réinitialisation et met à jour le mot de passe
// 1. Vérifie et décode le token JWT
// 2. Recherche l'utilisateur correspondant
// 3. Hache le nouveau mot de passe de manière sécurisée
// 4. Met à jour l'utilisateur en base de données
  const resetPassword = async (req, res) => {
    try {
      console.log("Requête reçue :", req.body);
      console.log("Token reçu :", req.params.token); // Vérifie que le token est bien passé
  
      const { newPassword } = req.body;
      const token = req.params.token; // Récupération du token depuis l'URL
  
      if (!token) {
        console.error("Erreur : Aucun token reçu !");
        return res.status(400).json({ message: "Token is required" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("Token décodé :", decoded);
  
      const user = await User.findById(decoded.userId);
      console.log("Utilisateur trouvé :", user);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!newPassword) {
        console.error("Erreur : Aucun mot de passe reçu !");
        return res.status(400).json({ message: "New password is required" });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.resetPasswordToken = null;
      await user.save();
  
      console.log("Mot de passe mis à jour !");
      res.status(200).json({ message: "Password successfully updated" });
    } catch (error) {
      console.error("Erreur serveur :", error);
      res.status(500).json({ message: "Invalid or expired token", error: error.message });
    }
  };  

module.exports = { forgetPassword, resetPassword };