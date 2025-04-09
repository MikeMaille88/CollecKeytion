# CollecKeytion


# 📋 Présentation
CollecKeytion est une application web dédiée aux collectionneurs de clefs en métal à l'effigie des attractions de Disneyland Paris.

Conçue pour répondre aux besoins spécifiques de cette communauté, l'application offre une solution simple et efficace pour gérer sa collection de clefs Disney, suivre ses acquisitions et identifier les pièces manquantes.

Ce projet est né d'une passion personnelle pour ces objets de collection et du constat qu'aucun outil dédié n'existait pour cette communauté active de collectionneurs.

# ✨ Fonctionnalités principales
Catalogue complet : Accès à une base de données exhaustive des clefs d'attraction Disney Paris

Gestion de collection : Marquez les clefs que vous possédez et celles que vous avez en double

Vue personnalisée : Visualisez facilement votre collection personnelle dans un espace dédié

Détails des clefs : Accédez à toutes les informations pertinentes sur chaque clef (attraction, land, date de sortie...)

Recherche et filtres : Trouvez rapidement des clefs par land ou par statut de possession

Suivi de progression : Visualisez l'avancement de votre collection par série ou par land

# 🛠️ Stack technique
CollecKeytion est développée avec l'architecture MERN :

Frontend : React.js, React Router, Vite, Tailwind CSS

Backend : Node.js, Express.js, API REST

Base de données : MongoDB avec Mongoose

Authentification : JWT (JSON Web Tokens)

Gestion d'images : Cloudinary

Déploiement : Vercel (frontend et backend)

CI/CD : GitHub Actions

# 📥 Prérequis
Pour installer et exécuter le projet localement, vous aurez besoin de :

Node.js (v14.x ou supérieur)

npm (v7.x ou supérieur)

MongoDB (local ou Atlas)

Un compte Cloudinary (gratuit)

# 🚀 Installation
Cloner le dépôt
```bash
git clone https://github.com/votre-username/colleckeytion.git
cd colleckeytion
```

## Installation des dépendances


### Installation des dépendances backend
```bash
cd Backend
npm install
```

### Installation des dépendances frontend
```bash
cd ../vite-project/src
npm install
```

## Configuration
Dans le dossier backend, créez un fichier .env basé sur le modèle .env.example :

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/colleckeytion
SECRET_KEY=votre_cle_secrete_jwt
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
PORT=3005
NODE_ENV=development
```

Dans le dossier frontend, créez un fichier .env :
```bash
REACT_APP_API_URL=http://localhost:5173/api
```

# 🏃‍♂️ Exécution du projet
En mode développement

## Démarrer le backend (depuis le dossier backend)
```bash
node server.js
```

## Démarrer le frontend (depuis le dossier frontend)
```bash
npm run dev
```

L'API backend sera disponible sur http://localhost:3005 et le frontend sur http://localhost:5173.

<!-- Avec Docker
Le projet peut également être exécuté avec Docker :
bash

# Construire et démarrer les conteneurs
docker-compose up -d

# Arrêter les conteneurs
docker-compose down -->

# 📁 Structure du projet
```bash

colleckeytion/
├── backend/                  # Code serveur Node.js/Express
│   ├── api/                  # Point d'entrée API pour Vercel serverless
│   │   └── index.js          # Handler serverless principal
│   ├── cloudinary.js         # Configuration et utilitaires Cloudinary
│   ├── controllers/          # Logique métier de l'application
│   │   └── forgetPassword.controller.js  # Gestion récupération mot de passe
│   ├── models/               # Modèles de données Mongoose
│   │   ├── keymodel.js       # Schéma des clefs d'attraction
│   │   ├── userkeysmodel.js  # Schéma relation utilisateur-clefs
│   │   └── usermodel.js      # Schéma utilisateur avec authentification
│   ├── routes/               # Définition des routes API REST
│   │   ├── keyRoutes.js      # Routes pour la gestion des clefs
│   │   ├── userKeysRoutes.js # Routes pour les relations utilisateur-clefs
│   │   └── userRoutes.js     # Routes authentification et gestion utilisateurs
│   ├── server.js             # Point d'entrée serveur Express
│   ├── importKeysRelease.js  # Script d'import initial des données
│   ├── tests/                # Tests unitaires et d'intégration
│   └── vercel.json           # Configuration déploiement backend Vercel
│
└── frontend/                 # Application React avec Vite
    ├── public/               # Fichiers statiques
    ├── src/                  # Code source React
    │   ├── components/       # Composants réutilisables
    │   │   ├── allKeys.jsx   # Affichage de toutes les clefs
    │   │   ├── authContext.jsx # Contexte d'authentification global
    │   │   ├── avatarModal.jsx # Modal pour gestion avatar utilisateur
    │   │   ├── keyCard.jsx   # Carte affichant une clef individuelle
    │   │   ├── landCard.jsx  # Carte pour filtrage par land
    │   │   ├── myKeys.jsx    # Affichage des clefs de l'utilisateur
    │   │   ├── privateRoute.jsx # Protection des routes authentifiées
    │   │   └── ... autres composants
    │   ├── pages/            # Pages principales de l'application
    │   │   ├── About.jsx     # Page À propos
    │   │   ├── Admin.jsx     # Interface d'administration
    │   │   ├── AllKeys.jsx   # Liste de toutes les clefs
    │   │   ├── KeyByLand.jsx # Filtrage des clefs par land
    │   │   ├── KeyPage.jsx   # Page détail d'une clef
    │   │   ├── MyKeys.jsx    # Collection personnelle
    │   │   └── ... autres pages
    │   └── utils/            # Fonctions utilitaires
    ├── tests/                # Tests frontend
    ├── tailwind.config.js    # Configuration Tailwind CSS
    └── vercel.json           # Configuration déploiement frontend Vercel
```

# 📡 API Reference
```
Clefs (api/keys)
GET     api/keys/                          Récupérer toutes les clefs
GET     api/keys/:id                       Récupérer une clef spécifique par son ID
POST    api/keys/                          Créer une nouvelle clef avec des images (téléchargement vers Cloudinary)
PATCH   api/keys/:id                       Mettre à jour une clef spécifique
DELETE  api/keys/:id                       Supprimer une clef spécifique

Utilisateurs (api/users)
GET     api/users/                         Récupérer tous les utilisateurs
GET     api/users/:id                      Récupérer un utilisateur spécifique par son ID
POST    api/users/                         Créer un nouvel utilisateur avec validation
POST    api/users/login                    Authentifier un utilisateur et générer un jeton d'authentification
POST    api/users/forgetPassword           Initier le processus de récupération de mot de passe
POST    api/users/resetPassword/:token     Réinitialiser le mot de passe à l'aide d'un jeton
PATCH   api/users/:id                      Mettre à jour un utilisateur spécifique
DELETE  api/users/:id                      Supprimer un utilisateur et les clefs qui lui sont associées

Relations Utilisateur-Clefs (api/userKeys)
GET     api/userKeys/                      Récupérer les relations utilisateur-clef (filtrable par userId et keyId)
POST    api/userKeys/                      Créer une nouvelle relation utilisateur-clef
PATCH   api/userKeys/:id                   Mettre à jour une relation utilisateur-clef
DELETE  api/userKeys/:id                   Supprimer une relation utilisateur-clef
```

# 🧩 Modèle de données
Utilisateur
```bash

{
  username: String,
  email: String,
  password: String (hashed),
  admin: Boolean,
  avatar: String,
  authTokens: Array
}
```

Clef d'attraction
```bash

{
  name: String,
  releaseDate: Date,
  price: Number,
  limited: Number,
  land: String,
  image: Object,
  description: String,
  banner: String
}
```

## 🚀 Déploiement
L'application est configurée pour un déploiement sur Vercel :

Frontend : https://colleckeytion.vercel.app

Backend : https://colleckeytion-backend.vercel.app


Pour déployer votre propre instance :

Créez un compte sur Vercel

Configurez vos variables d'environnement dans le tableau de bord Vercel

Connectez votre dépôt GitHub

Déployez le frontend et le backend en tant que projets séparés

# 🧪 Tests

## Exécuter les tests backend
```bash
cd backend
npm test
```

## Exécuter les tests frontend
```bash
cd frontend
npm test
```

# 🔮 Évolutions futures
Système d'échange entre collectionneurs

Notifications pour les nouvelles sorties de clefs

Forum de discussion pour la communauté

Statistiques avancées sur sa collection

Version mobile native de l'application

# 📄 Licence
Distribué sous licence MIT. Voir LICENSE pour plus d'informations.

# 📧 Contact
Votre Nom - votre-email@example.com
Lien du projet : https://github.com/votre-username/colleckeytion

Fait avec ❤️ pour les collectionneurs de clefs Disney
