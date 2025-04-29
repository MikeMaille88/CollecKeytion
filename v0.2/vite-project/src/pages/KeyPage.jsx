import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "../components/goBackButton";
import KeyCarousel from "../components/carousel";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const KeyPage = () => {
  const { keyId } = useParams();
  const [keyData, setKeyData] = useState(null);
  const [possess, setPossess] = useState(false);
  const [possessDouble, setPossessDouble] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userKeyId, setUserKeyId] = useState(null);
  const userId = localStorage.getItem("authId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les données de la clé
        const response = await fetch(`${apiUrl}keys/${keyId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setKeyData(data);

        // Vérifier si la relation existe déjà dans userkeys
        const userKeyResponse = await fetch(
          `${apiUrl}userkeys?userId=${userId}&keyId=${keyId}`
        );

        if (userKeyResponse.ok) {
          const userKeyData = await userKeyResponse.json();
          //console.log(userKeyData);
          // La relation existe, mettre à jour les états en conséquence
          setPossess(userKeyData.possess);
          setPossessDouble(userKeyData.possessDouble);
        }
      } catch (error) {
        console.error("Error fetching key:", error.message);
      }
    };

    fetchData();
  }, [keyId, userId]);

  const handleCheckboxChange = async (checkboxType) => {
    try {
      const currentUserKeyResponse = await fetch(
        `${apiUrl}userkeys?userId=${userId}&keyId=${keyId}`
      );

      let relationFound = true;

      if (!currentUserKeyResponse.ok) {
        if (currentUserKeyResponse.status === 404) {
          console.error("Relation non trouvée. Création en cours...");
          relationFound = false;
        } else {
          throw new Error(
            `GET_HTTP error! Status: ${currentUserKeyResponse.status}`
          );
        }
      }

      if (relationFound === false) {
        const newUserKeyResponse = await fetch(
          `${apiUrl}userkeys`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: userId,
              keyId: keyId,
              possess: checkboxType === "possess",
              possessDouble: checkboxType === "possessDouble",
            }),
          }
        );

        if (!newUserKeyResponse.ok) {
          throw new Error(
            `POST_HTTP error! Status: ${newUserKeyResponse.status}`
          );
        }

        const newUserKeyData = await newUserKeyResponse.json();
        setUserKeyId(newUserKeyData._id);

        // Mettez à jour les états en conséquence
        if (checkboxType === "possess") {
          setPossess(!possess);
        } else if (checkboxType === "possessDouble") {
          setPossessDouble(!possessDouble);
        }
      } else {
        const currentUserKeyData = await currentUserKeyResponse.json();
        const userKeyId = currentUserKeyData._id;
        const newData = {
          [checkboxType]: !currentUserKeyData[checkboxType],
        };
        //console.log("newDataPatched : ", newData);

        const patchResponse = await fetch(
          `${apiUrl}userkeys/${userKeyId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );

        if (!patchResponse.ok) {
          throw new Error(`PATCH_HTTP error! Status: ${patchResponse.status}`);
        }

        // Mettez à jour les états en conséquence
        if (checkboxType === "possess") {
          setPossess((prev) => {
            //console.log("possess: ", !prev);
            return !prev;
          });
        } else if (checkboxType === "possessDouble") {
          setPossessDouble((prev) => {
            //console.log("possessDouble: ", !prev);
            return !prev;
          });
        }
      }
    } catch (error) {
      console.error("Error updating key possession:", error.message);
    }
  };

  if (!keyData) {
    // Vous pouvez afficher un état de chargement pendant le chargement des données
    return <div>Loading...</div>;
  }

  // Formatage de la date avec date-fns et la locale française
  const formattedDate = keyData.releaseDate
    ? format(new Date(keyData.releaseDate), "d MMMM yyyy", { locale: fr })
    : "Date inconnue";

    return (
      <>
        <GoBackButton />
        <div className="bg-slate-700 min-h-screen flex justify-center pb-12 sm:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-8">
            <div>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-10 sm:gap-y-16 lg:gap-x-8">
                <div key={keyData.name}>
                  <dd className="mt-2 text-sm text-gray-200">
                    <KeyCarousel images={keyData.image} />
                  </dd>
                </div>
              </dl>
            </div>
    
            {/* Conteneur principal pour la bannière et autres détails */}
            <div className="flex flex-col gap-6 text-gray-200">
              {/* Ajustez l'image de la bannière */}
              <div className="flex items-center justify-center mt-2">
                <img
                  className="rounded-lg w-full h-64 object-cover"
                  src={`${keyData.banner}`}
                  alt={keyData.name}
                />
              </div>
    
              {/* Titre et description en pleine largeur */}
              <h2 className="text-3xl font-bold tracking-tight text-gray-200 font-albra sm:text-4xl">
                {keyData.name}
              </h2>
              <p className="text-lg text-gray-200 font-albra">{keyData.description}</p>
              
              {/* Conteneur flex pour les boutons à gauche et les infos techniques à droite */}
              <div className="flex flex-col md:flex-row gap-8 mt-2">
                {/* Colonne de gauche - Infos techniques */}
                <div className="flex-1 flex flex-col gap-3 text-lg font-albra">
                  <p className="mt-6">Prix de base : {keyData.price}€</p>
                  <p>Edition limitée à : {keyData.limited} ex.</p>
                  <p>Land : {keyData.land}</p>
                  <p>Date de sortie : {formattedDate}</p>
                </div>
                
                {/* Colonne de droite - Boutons de collection, maintenant centrés */}
                <div className="flex flex-col gap-4 items-center md:items-start md:mr-20 mb-10 md:mb-0">
                  {/* Groupe de boutons avec largeur fixe */}
                  <div className="w-full max-w-[250px] flex flex-col gap-4 font-albra">
                    {/* Premier bouton - Je l'ai */}
                    <label className="cursor-pointer w-full">
                      <input
                        type="checkbox"
                        checked={possess}
                        onChange={() => handleCheckboxChange("possess")}
                        className="sr-only"
                      />
                      <div className={`flex items-center w-full p-4 rounded-xl bg-slate-800 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                        ${possess 
                          ? 'bg-gradient-to-br from-slate-800 to-teal-900 border-teal-400' 
                          : 'border-slate-600 opacity-80'}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors
                          ${possess 
                            ? 'bg-opacity-15 bg-cyan-700 text-teal-400' 
                            : 'bg-slate-700 text-slate-400'}`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.28 13.61C15.15 14.74 13.53 15.09 12.1 14.64L9.51001 17.22C9.33001 17.41 8.96001 17.53 8.69001 17.49L7.49001 17.33C7.09001 17.28 6.73001 16.9 6.67001 16.51L6.51001 15.31C6.47001 15.05 6.60001 14.68 6.78001 14.49L9.36001 11.91C8.92001 10.48 9.26001 8.86001 10.39 7.73001C12.01 6.11001 14.65 6.11001 16.28 7.73001C17.9 9.34001 17.9 11.98 16.28 13.61Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.45 16.28L9.59998 15.42" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.3945 10.7H13.4035" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-300 text-lg">Ma Collection</span>
                          <span className={`font-semibold text-base transition-colors
                            ${possess ? 'text-teal-400' : 'text-slate-400'}`}
                          >
                            {possess ? 'Acquise' : 'Manquante'}
                          </span>
                        </div>
                      </div>
                    </label>
                    
                    {/* Deuxième bouton - En double */}
                    <label className="cursor-pointer w-full">
                      <input
                        type="checkbox"
                        checked={possessDouble}
                        onChange={() => handleCheckboxChange("possessDouble")}
                        className="sr-only"
                      />
                      <div className={`flex items-center w-full p-4 rounded-xl bg-slate-800 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                        ${possessDouble 
                          ? 'bg-gradient-to-br from-slate-800 to-teal-900 border-teal-400' 
                          : 'border-slate-600 opacity-80'}`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors relative
                          ${possessDouble 
                            ? 'bg-opacity-15 bg-cyan-700 text-teal-400' 
                            : 'bg-slate-700 text-slate-400'}`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.28 13.61C15.15 14.74 13.53 15.09 12.1 14.64L9.51001 17.22C9.33001 17.41 8.96001 17.53 8.69001 17.49L7.49001 17.33C7.09001 17.28 6.73001 16.9 6.67001 16.51L6.51001 15.31C6.47001 15.05 6.60001 14.68 6.78001 14.49L9.36001 11.91C8.92001 10.48 9.26001 8.86001 10.39 7.73001C12.01 6.11001 14.65 6.11001 16.28 7.73001C17.9 9.34001 17.9 11.98 16.28 13.61Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.45 16.28L9.59998 15.42" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.3945 10.7H13.4035" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.28 13.61C15.15 14.74 13.53 15.09 12.1 14.64L9.51001 17.22C9.33001 17.41 8.96001 17.53 8.69001 17.49L7.49001 17.33C7.09001 17.28 6.73001 16.9 6.67001 16.51L6.51001 15.31C6.47001 15.05 6.60001 14.68 6.78001 14.49L9.36001 11.91C8.92001 10.48 9.26001 8.86001 10.39 7.73001C12.01 6.11001 14.65 6.11001 16.28 7.73001C17.9 9.34001 17.9 11.98 16.28 13.61Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.45 16.28L9.59998 15.42" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.3945 10.7H13.4035" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-300 text-lg">Double</span>
                          <span className={`font-semibold text-base transition-colors
                            ${possessDouble ? 'text-teal-400' : 'text-slate-400'}`}
                          >
                            {possessDouble ? 'Oui' : 'Non'}
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
    
  
};

export default KeyPage;
