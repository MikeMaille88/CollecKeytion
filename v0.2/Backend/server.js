const express = require("express");
const path = require("path"); // Importe le module path pour gérer les chemins de fichiers
const multer = require("multer"); // Importe le module multer pour gérer le téléchargement de fichiers, y compris les images
require("dotenv").config(); // Charge les variables d'environnement depuis un fichier .env
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const corsOption = {
  origin: "*",
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log("Connexion à MongoDB échouée !" + e));

app.use(cors(corsOption));
app.use(express.json()); // Middleware pour analyser le contenu JSON des requêtes

// Gestion des requêtes GET pour le chemin racine
app.get("/", async (req, res) => {
  console.log(req.query); // Affiche les paramètres de la requête dans la console
  console.log(res);
});

app.get("*", (req, res) => {
  res.status(404).send("error");
});
// app.post('/',(req,res) =>{
//     console.log(req.body);
//     res.send('ok')
// })

// Gestion des requêtes GET pour toutes les autres routes
app.get("*", (req, res) => {
  res.status(404).send("error"); // Répond avec une erreur 404 pour toutes les autres routes non définies
});

// Gestion des requêtes POST pour le chemin racine
app.post("/", (req, res) => {
  console.log(req.body); // Affiche le corps de la requête POST dans la console
  res.send("ok"); // Répond avec 'ok'
});

// Démarrage du serveur Express
app.listen(process.env.PORT, () => {
  console.log(
    `Le serveur Express est en cours d'écoute sur le port ${process.env.PORT} `
  );
});
