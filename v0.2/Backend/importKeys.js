const mongoose = require('mongoose');
const fs = require('fs');
require("dotenv").config();
const csv = require('csv-parser');
const Key = require('./models/keymodel.js');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connecté à MongoDB");

    const updatePromises = []; // Tableau pour stocker les promesses d'updateOne

    fs.createReadStream('./public/clefs_disneyland_paris.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Fonction pour convertir une date en format "DD MMM YYYY" en "YYYY-MM-DD"
        const convertDate = (dateStr) => {
          const [day, month, year] = dateStr.split(" ");
          const months = {
            "janvier": "01", "février": "02", "mars": "03", "avril": "04",
            "mai": "05", "juin": "06", "juillet": "07", "août": "08",
            "septembre": "09", "octobre": "10", "novembre": "11", "décembre": "12"
          };
          return `${year}-${months[month.toLowerCase()]}-${day.padStart(2, '0')}`;
        };

        const releaseDateISO = convertDate(data['Date de sortie']);

        // Ajoute chaque opération updateOne au tableau de promesses
        updatePromises.push(
          Key.updateOne(
            { name: data['Attraction'] }, // Critère de recherche basé sur le nom
            {
              $set: {
                name: data['Attraction'],
                releaseDate: new Date(releaseDateISO),
                price: parseFloat(data['Prix']),
                limited: parseInt(data['Exemplaires'], 10),
                // land: data['land'], // Décommenter si la colonne existe dans ton CSV
                // image: {}, // Décommenter et compléter si des images sont à ajouter
                // description: "Description par défaut" // Ajouter ou adapter la description si nécessaire
              }
            },
            { upsert: true } // Option pour insérer le document s'il n'existe pas
          ).then(() => {
            console.log(`Document pour ${data['Attraction']} traité`);
          }).catch(error => {
            console.error(`Erreur lors de la mise à jour de ${data['Attraction']}:`, error);
          })
        );
      })
      .on('end', async () => {
        try {
          await Promise.all(updatePromises); // Attendre la résolution de toutes les promesses
          console.log("Tous les documents ont été traités");
        } finally {
          mongoose.connection.close();
        }
      });
  })
  .catch(error => console.error('Erreur de connexion à MongoDB:', error));
