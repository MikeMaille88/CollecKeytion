const mongoose = require("mongoose");
const { Schema, model } = mongoose; //Tout d'abord, nous importons le module mongoose, qui est une bibliothèque permettant de travailler avec des bases de données MongoDB depuis Node.js.
const jsonwebtoken = require("jsonwebtoken");
const { sign } = jsonwebtoken;

// un schéma (ou modèle) de données pour nos produits en utilisant mongoose.Schema.
//  Un schéma indique à MongoDB comment les données des produits seront stockées dans la base de données. Il comprend plusieurs champs pour chaque user,
//  chacun avec ses caractéristiques.

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Please enter your username"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
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
  authTokens: [
    {
      authToken: {
        type: String,
        required: true,
      },
    },
  ],
});

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
// Enfin, nous créons un modèle de user en utilisant mongoose.model en spécifiant le nom du modèle ("user") et le schéma que nous avons défini précédemment. Ce modèle nous permettra d'effectuer des opérations de base de données sur les users.

// Nous exportons le modèle User pour pouvoir l'utiliser dans d'autres parties de notre application.
