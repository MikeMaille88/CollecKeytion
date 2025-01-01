//server.js

const express = require("express");
require("dotenv").config(); // Charge les variables d'environnement depuis un fichier .env
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const keyRoute = require("./routes/keyRoutes");
const userRoute = require("./routes/userRoutes");
const userKeysRoute = require("./routes/userKeysRoutes");

const corsOption = {
  origin: ["https://colleckeytion.vercel.app", "https://colleckeytionbackend-mikemaille88s-projects.vercel.app", "http://localhost:5173"], // Ajoutez toutes les origines nécessaires
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
};

// Connexion à la base de données MongoDB
console.time("MongoDB Connection Time");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "CollecKeytion",
  })
  .then(() => {
    console.timeEnd("MongoDB Connection Time");
    console.log("Connexion MongoDB réussie !");
  })
  .catch((e) => console.log("Connexion à MongoDB échouée !" + e));

app.use(express.json()); // Middleware pour analyser le contenu JSON des requêtes
app.use(cors(corsOption));
app.use("/keys", keyRoute); // Utilisez le routeur keyRoute pour gérer les routes commençant par '/key'
app.use("/users", userRoute); // Utilisez le routeur userRoute pour gérer les routes commençant par '/users'
app.use("/userkeys", userKeysRoute); // Utilisez le routeur userKeysRoute pour gérer les routes commençant par '/userkeys'

// Gestion des requêtes GET pour le chemin racine
app.get("/", async (req, res) => {
  console.log(req.query); // Affiche les paramètres de la requête dans la console
  console.log(res);
  res.status(200).json({ message: "Bienvenue sur l'API CollecKeytion!" });
});

// Gestion des requêtes GET pour toutes les autres routes
app.get("*", (req, res) => {
  console.log(req.body);
  res.status(404).json({ error: "Route not found" });
});

// Gestion des requêtes POST pour le chemin racine
app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Requête POST reçue." });
});

// Démarrage du serveur Express
app.listen(process.env.PORT, () => {
  console.log(
    `Le serveur Express est en cours d'écoute sur le port ${process.env.PORT} `
  );
});

module.exports = app;