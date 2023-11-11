const mongoose = require("mongoose"); //Tout d'abord, nous importons le module mongoose, qui est une bibliothèque permettant de travailler avec des bases de données MongoDB depuis Node.js.
const jwt = require("jsonwebtoken");

// un schéma (ou modèle) de données pour nos produits en utilisant mongoose.Schema.
//  Un schéma indique à MongoDB comment les données des produits seront stockées dans la base de données. Il comprend plusieurs champs pour chaque produit,
//  chacun avec ses caractéristiques.

const userSchema = mongoose.Schema({
  firstName: {
    type: "String",
    required: [true, "Please enter your firstname"],
  },
  lastName: {
    type: "String",
    required: [true, "Please enter your lastname"],
  },
  email: {
    type: "String",
    required: [true, "Please enter your email"],
  },
  password: {
    type: "String",
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
        type: "String",
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
  const authToken = jwt.sign(
    { id: this.id.toString() },
    process.env.SECRET_KEY
  );
  this.authTokens.push({ authToken: authToken });
  await this.save();
  return authToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
// Enfin, nous créons un modèle de produit en utilisant mongoose.model en spécifiant le nom du modèle ("user") et le schéma que nous avons défini précédemment. Ce modèle nous permettra d'effectuer des opérations de base de données sur les produits.

// Nous exportons le modèle Product pour pouvoir l'utiliser dans d'autres parties de notre application.
