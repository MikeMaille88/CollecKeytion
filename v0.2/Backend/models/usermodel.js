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


const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Please enter your username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Please enter your password"],
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
