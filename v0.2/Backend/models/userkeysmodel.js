import { Schema, model } from "mongoose";

// Modèle pour la relation entre utilisateur et clef
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
});

const UserKeys = model("UserKeys", UserKeysSchema);

export { UserKeys };
