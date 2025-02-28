const mongoose = require("mongoose");
const { Schema, model } = mongoose; 

const KeySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a Key name"],
    },
    releaseDate: {
      type: Date,
      required: true,
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
    image: {
      boxFront: String,
      boxBack: String,
      inBox: String,
      withoutBox: String,
    },
    description: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Key = model("Key", KeySchema);

module.exports = Key;