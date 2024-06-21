// AllKeys.jsx page
import React, { useState, useEffect } from "react";
import KeyCard from "../components/keyCard";

const AllKeys = () => {
  const [keys, setKeys] = useState([]);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://colleckeytion.vercel.app/keys");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setKeys(data);
      } catch (error) {
        console.error("Error fetching keys:", error.message);
      }
    };

    fetchData();

    // Ajouter un écouteur d'événements pour le scroll lors du montage du composant
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Afficher le bouton lorsque la position de défilement dépasse une certaine valeur (par exemple, 200 pixels)
      setShowScrollTopButton(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    // Nettoyer l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fonction pour faire défiler vers le haut lorsque le bouton est cliqué
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-700">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          All Keys
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {keys.map((key) => (
            <KeyCard key={key._id} keyData={key} />
          ))}
        </div>

        {/* Bouton pour revenir en haut */}
        {showScrollTopButton && (
          <button
            className="fixed bottom-4 right-4 bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={scrollToTop}
          >
            Back to Top
          </button>
        )}
      </div>
    </div>
  );
};

export default AllKeys;
