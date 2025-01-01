const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();
const Key = require('./models/keymodel.js'); // Assure-toi d'importer le modèle correct

mongoose.connect(process.env.MONGODB_URL, { dbName: 'CollecKeytion', useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connecté à MongoDB");

    const updates = []; // Stockera les données du CSV pour mise à jour

    const parseDate = (dateStr) => {
      // Tente de convertir la date directement
      const parsedDate = new Date(dateStr);
    
      // Si la conversion échoue, gère les formats non standards
      if (isNaN(parsedDate)) {
        // Exemple : pour "30 mars 2018"
        const [day, monthStr, year] = dateStr.split(' ');
        const months = {
          janvier: 0,
          février: 1,
          mars: 2,
          avril: 3,
          mai: 4,
          juin: 5,
          juillet: 6,
          août: 7,
          septembre: 8,
          octobre: 9,
          novembre: 10,
          décembre: 11,
        };
    
        const month = months[monthStr.toLowerCase()];
        if (month !== undefined) {
          return new Date(year, month, parseInt(day));
        } else {
          throw new Error(`Format de date non reconnu : ${dateStr}`);
        }
      }
    
      console.log(`Date : ${parsedDate}`);
      return parsedDate;
    };

    fs.createReadStream('./public/clefs_disneyland_paris.csv') // Chemin vers ton fichier CSV
      .pipe(csv())
      .on('data', (data) => {
        updates.push({
          name: data['Attraction'],
          releaseDate: parseDate(data['Date de sortie']), // Conversion en objet Date
        });
      })
      .on('end', async () => {
        try {
          // Parcourir chaque ligne du CSV et mettre à jour les documents correspondants
          for (const update of updates) {
            const { name, releaseDate } = update;

            const result = await Key.findOneAndUpdate(
              { name }, // Critère de recherche : le nom
              { $set: { releaseDate } }, // Met à jour uniquement la date de sortie
              { new: true, upsert: false } // Ne crée pas un nouveau document si le nom n'existe pas
            );

            if (result) {
              console.log(`Document mis à jour pour : ${name} ${result}`);
            } else {
              console.log(`Aucun document trouvé pour : ${name}`);
            }
          }
        } catch (error) {
          console.error("Erreur lors de la mise à jour :", error);
        } finally {
          mongoose.connection.close();
        }
      });
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error);
  });
