const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const forgetPassword = async (req, res) => {
  try {
    // Trouver l'utilisateur par email
    const user = await User.findOne({ mail: req.body.email });

    // Si l'utilisateur n'existe pas, envoyer un message d'erreur
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Générer un token JWT unique contenant l'ID de l'utilisateur
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    // Configuration du transporteur pour envoyer l'email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

    // Configuration de l'email
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    // Envoyer l'email
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
    // Vérifier le token envoyé par l'utilisateur
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET_KEY
    );

    // Si le token est invalide, retourner une erreur
    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // Trouver l'utilisateur avec l'ID contenu dans le token
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(401).send({ message: "No user found" });
    }

    // Hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);

    // Mettre à jour le mot de passe de l'utilisateur
    user.password = req.body.newPassword;
    await user.save();

    // Envoyer une réponse de succès
    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    // Envoyer une réponse en cas d'erreur
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  forgetPassword,
  resetPassword,
};
