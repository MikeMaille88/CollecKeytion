//server.js 
const express = require("express");
require("dotenv").config();
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
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
};

// Connexion à la base de données MongoDB
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
