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
  origin: [
    "https://colleckeytion.vercel.app",
    "https://colleckeytionbackend-mikemaille88s-projects.vercel.app",
    "http://localhost:5173",
  ], // Ajoutez toutes les origines nécessaires
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
};

// Connexion à la base de données MongoDB
console.time("MongoDB Connection Time");

const dbName =
  process.env.NODE_ENV === "test" ? "test" : "CollecKeytion"; // Choisissez la base en fonction de l'environnement

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName, // Utilisez le nom de base correct
  })
  .then(() => {
    console.timeEnd("MongoDB Connection Time");
    console.log(`Connexion MongoDB réussie à la base ${dbName} !`);
  })
  .catch((e) =>
    console.log(`Connexion à MongoDB échouée pour la base ${dbName} !`, e)
  );

app.use(express.json()); // Middleware pour analyser le contenu JSON des requêtes
app.use(cors(corsOption));
app.use("/keys", keyRoute); // Utilisez le routeur keyRoute pour gérer les routes commençant par '/key'
app.use("/users", userRoute); // Utilisez le routeur userRoute pour gérer les routes commençant par '/users'
app.use("/userkeys", userKeysRoute); // Utilisez le routeur userKeysRoute pour gérer les routes commençant par '/userkeys'

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

// Exporter l'application
module.exports = app;

// Démarrer le serveur si exécuté directement
if (require.main === module) {
  app.listen(process.env.PORT, () => {
    console.log(
      `Le serveur Express est en cours d'écoute sur le port ${process.env.PORT} `
    );
  });
}
