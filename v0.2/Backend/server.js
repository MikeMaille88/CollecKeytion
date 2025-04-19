/**
 * server.js
 * 
 * Ce fichier est le point d'entrée principal du Backend de CollecKeytion.
 * Il configure le serveur Express, établit la connexion à la base de données MongoDB,
 * initialise les middlewares nécessaires et définit les routes de l'API.
 * 
 * Les fonctionnalités incluent:
 * - Configuration CORS avec liste blanche d'origines autorisées
 * - Connexion à MongoDB avec sélection de base de données selon l'environnement
 * - Enregistrement des routes pour les clefs, utilisateurs et relations utilisateur-clefs
 * - Mesure des performances de connexion à la base de données
 * - Gestion des routes par défaut et des erreurs 404
 * - Configuration pour exécution directe ou comme module
 */

const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const keyRoute = require("./routes/keyRoutes");
const userRoute = require("./routes/userRoutes");
const userKeysRoute = require("./routes/userKeysRoutes");

// Configuration CORS sécurisée avec liste blanche d'origines autorisées
// pour la production, les environnements de développement et de test
const corsOption = {
  origin: [
    "https://colleckeytion.vercel.app",
    "https://colleckeytionbackend-mikemaille88s-projects.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
};

// Connexion à MongoDB avec sélection dynamique de la base de données
// selon l'environnement (test ou production) et mesure du temps de connexion
console.time("MongoDB Connection Time");

const dbName =
  process.env.NODE_ENV === "test" ? "test" : "CollecKeytion"; // Base en fonction de l'environnement

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName,
  })
  .then(() => {
    console.timeEnd("MongoDB Connection Time");
    console.log(`Connexion MongoDB réussie à la base ${dbName} !`);
  })
  .catch((e) =>
    console.log(`Connexion à MongoDB échouée pour la base ${dbName} !`, e)
  );

// Configuration des middlewares essentiels:
// - express.json pour le parsing des requêtes JSON
// - cors avec configuration personnalisée pour la sécurité
// - montage des routeurs pour chaque domaine fonctionnel de l'API
app.use(express.json()); 
app.use(cors(corsOption));
app.use("/keys", keyRoute); 
app.use("/users", userRoute);
app.use("/userkeys", userKeysRoute);

// Gestion des requêtes GET pour le chemin racine
app.get("/", async (req, res) => {
  res.status(200).json({ message: "Bienvenue sur l'API CollecKeytion!" });
});

// Gestion des requêtes GET pour toutes les autres routes
app.get("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Gestion des requêtes POST pour le chemin racine
app.post("/", (req, res) => {
  res.status(200).json({ message: "Requête POST reçue." });
});

module.exports = app;

if (require.main === module) {
  app.listen(process.env.PORT, () => {
    console.log(
      `Le serveur Express est en cours d'écoute sur le port ${process.env.PORT} `
    );
  });
}
