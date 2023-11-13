const mongoose = require("mongoose");
const { Schema, model } = mongoose; //Tout d'abord, nous importons le module mongoose, qui est une bibliothèque permettant de travailler avec des bases de données MongoDB depuis Node.js.

// un schéma (ou modèle) de données pour nos produits en utilisant mongoose.Schema.
//  Un schéma indique à MongoDB comment les données des produits seront stockées dans la base de données. Il comprend plusieurs champs pour chaque produit,
//  chacun avec ses caractéristiques.
const KeySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a Key name"],
    },
    price: {
      type: Number,
      required: true,
    },
    limited: {
      type: Number,
      required: true,
    },
    land: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Key = model("Key", KeySchema);

module.exports = Key;

// Enfin, nous créons un modèle de produit en utilisant mongoose.model en spécifiant le nom du modèle ("Key") et le schéma que nous avons défini précédemment. Ce modèle nous permettra d'effectuer des opérations de base de données sur les produits.

// Nous exportons le modèle Key pour pouvoir l'utiliser dans d'autres parties de notre application.
