/**
 * usermodel.js
 * 
 * Ce fichier définit le schéma MongoDB pour les utilisateurs
 * et les méthodes associées pour l'authentification et la gestion des tokens.
 */


const mongoose = require("mongoose");
const { Schema, model } = mongoose; 
const jsonwebtoken = require("jsonwebtoken");
const { sign } = jsonwebtoken;
const uniqueValidator = require("mongoose-unique-validator");

const passwordValidator = function(password) {
  // Minimum 12 caractères
  if (password.length < 12) return false;
  
  // Au moins une minuscule
  if (!/[a-z]/.test(password)) return false;
  
  // Au moins une majuscule
  if (!/[A-Z]/.test(password)) return false;
  
  // Au moins un chiffre
  if (!/[0-9]/.test(password)) return false;
  
  // Au moins un caractère spécial
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  
  return true;
};

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Entrez votre pseudo"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Entrez votre email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Entrez votre mot de passe"],
    // Mise à jour de la validation du mot de passe
    validate: {
      validator: function(v) {
        // Ne pas valider le mot de passe hashé lors de la récupération depuis la BD
        // La validation s'applique uniquement lors de la création/modification
        if (this.isModified('password') || this.isNew) {
          return passwordValidator(v);
        }
        return true;
      },
      message: 'Le mot de passe doit contenir au moins 12 caractères, incluant au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial'
    }
  },
  admin: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  authTokens: [
    {
      authToken: {
        type: String,
      },
    },
  ],
});

userSchema.plugin(uniqueValidator);

//Gestion de l'authentification
userSchema.methods.generateAuthToken = function () {
  return sign({ id: this.id.toString() }, process.env.SECRET_KEY);
};
 
userSchema.methods.saveAuthToken = async function (authToken) {
  this.authTokens.push({ authToken });
  await this.save();
};

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = this.generateAuthToken();
  await this.saveAuthToken(authToken);
  return authToken;
};

const User = model("User", userSchema);

module.exports = User;
