import React, { useState, useEffect } from "react";
import KeyCard from "../components/keyCard";
import { useParams } from "react-router-dom";

// Fonction de mappage pour traduire les abréviations en noms complets
const mapAbbreviationToFullName = (abbreviation) => {
  // Table de mappage des abréviations vers les noms complets
  const mapping = {
    MSU: "Main Street USA",
    WDS: "Walt Disney Studios",
    DVH: "Disney Village et Hotels",
  };

  // Renvoie le nom complet correspondant à l'abréviation, ou l'abréviation elle-même si non trouvée
  return mapping[abbreviation] || abbreviation;
};

const KeyByLand = () => {
  const [keys, setKeys] = useState([]);
  const { land } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/keys");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Traduire l'abréviation du land en nom complet
        const fullLandName = mapAbbreviationToFullName(land);

        // Filtrer les clefs en fonction du nom complet du land
        const filteredKeys = data.filter((key) => key.land === fullLandName);

        setKeys(filteredKeys);
      } catch (error) {
        console.error("Error fetching keys:", error.message);
      }
    };

    fetchData();
  }, [land]);

  // Traduire l'abréviation du land en nom complet pour le titre de la page
  const fullLandNameForTitle = mapAbbreviationToFullName(land);

  return (
    <div className="bg-gradient-to-tr from-teal-800 to-teal-500">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {fullLandNameForTitle} Keys
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {keys.map((key) => (
            <KeyCard key={key._id} keyData={key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyByLand;
