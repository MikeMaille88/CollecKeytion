/**
 * userkeysmodel.js
 * 
 * Ce fichier définit le schéma MongoDB pour les relations entre utilisateur et clef
 */

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserKeysSchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  keyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Key",
    required: true,
  },
  possess: {
    type: Boolean,
    default: false,
  },
  possessDouble: {
    type: Boolean,
    default: false,
  },
});

UserKeysSchema.index({ userId: 1 });
UserKeysSchema.index({ keyId: 1 });

const UserKeys = model("UserKeys", UserKeysSchema);

module.exports = { UserKeys };
