import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "../components/goBackButton";
import KeyCarousel from "../components/carousel";
//import { useAuth } from "../components/authContext";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const KeyPage = () => {
  const { keyId } = useParams();
  const [keyData, setKeyData] = useState(null);
  const [possess, setPossess] = useState(false);
  const [possessDouble, setPossessDouble] = useState(false);
  const [userKeyId, setUserKeyId] = useState(null);
  //const { userId } = useAuth();
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

  // const getUserKeyById = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:3005/userkeys/${id}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching user key:", error.message);
  //     return null;
  //   }
  // };

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

  return (
    <>
      <GoBackButton />
      <div className="bg-slate-700 min-h-screen flex justify-center">
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
                src={`${keyData.image.banner}`}
                alt={keyData.name}
              />
            </div>
  
            {/* Texte et informations supplémentaires */}
            <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
              {keyData.name}
            </h2>
            <p className="text-gray-200 mt-4">{keyData.description}</p>
            <p className="mt-4">Retail Price : €{keyData.price}</p>
            <p>Limited Edition : {keyData.limited} ex.</p>
            <p>Land : {keyData.land}</p>
  
            {/* Checkbox pour les possessions */}
            <p className="mt-4 flex items-center space-x-4">
              <span>Have it</span>
              <input
                id="possessCheckbox"
                type="checkbox"
                checked={possess}
                onChange={() => handleCheckboxChange("possess")}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
              <span>In double</span>
              <input
                id="possessDoubleCheckbox"
                type="checkbox"
                checked={possessDouble}
                onChange={() => handleCheckboxChange("possessDouble")}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default KeyPage;
