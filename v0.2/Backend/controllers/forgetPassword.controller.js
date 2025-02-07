//forgetPassword.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const forgetPassword = async (req, res) => {
    try {
      console.log("Requête reçue :", req.body);
      // Find the user by email
      const { email } = req.body;
      console.log("Recherche de l'email :", email); 
      const user = await User.findOne({ email });
      console.log("Résultat MongoDB :", user);

  
      // If user not found, send error message
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Generate a unique JWT token for the user that contains the user's id
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "10m",});
  
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
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "CollecKeytion - Reset Password",
        html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:5173/reset/${token}">Reset Your Password</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: "Email sent" });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

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