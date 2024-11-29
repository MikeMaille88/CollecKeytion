import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

const transformImageUrl = (url, width, height) => {
  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto,w_${width},h_${height}/`
  );
};

const MyKeys = () => {
  const userId = localStorage.getItem("authId");
  const [userKeysData, setUserKeysData] = useState([]);
  const [keysData, setKeysData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Vérifier les relations existantes par user dans userkeys
        const relationUserKeyResponse = await fetch(
          `${apiUrl}userkeys?userId=${userId}&possess=true`
        );

        if (relationUserKeyResponse.ok) {
          const relationUserKeyData = await relationUserKeyResponse.json();
          setUserKeysData(relationUserKeyData);

          // Charger les données de la clé
          try {
            const response = await fetch(`${apiUrl}keys`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const keysData = await response.json();
            setKeysData(keysData);
          } catch (error) {
            console.error("Error fetching key:", error.message);
          }
        }
      } catch (error) {
        console.error("Error fetching relation(s):", error.message);
      }
    };

    fetchData();
  }, [userId]);


  // Filtre des clés valides pour éviter les données inutiles
  const validKeys = userKeysData.filter((relationData) =>
    keysData.some((key) => key._id === relationData.keyId)
  );

  // Diviser les clés en groupes de 12 pour chaque boîte
  const groupedKeys = [];
  for (let i = 0; i < validKeys.length; i += 12) {
    groupedKeys.push(validKeys.slice(i, i + 12));
  }

  return (
    <div className="bg-slate-700 p-10 flex justify-center">
      <div className="flex flex-wrap gap-0 justify-center">
        {groupedKeys.map((keysGroup, index) => (
          <div
            key={index}
            className="relative flex justify-center items-center"
            style={{
              width: "500px", 
              height: "800px", 
              backgroundImage: `url(${transformImageUrl(
                "https://res.cloudinary.com/colleckeytion/image/upload/v1732638813/CollecKeytion/others/atmosphera_keybox_preview_rev_1_romzk7.png",
                500,
                800
              )})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              margin: "-20px", 
            }}
          >
            <div 
              className="grid grid-cols-4 grid-rows-3 gap-y-5 w-full h-full"
              style={{
                width: "470px",
                height: "710px",
                padding_left: "25px",
                padding_right: "15px",
              }}>
              {keysGroup.map((relationData, i) => {
                const ownedKey = keysData.find(
                  (key) => key._id === relationData.keyId
                );

                return (
                  ownedKey && (
                    <Link
                      key={ownedKey._id}
                      to={`/keys/${ownedKey._id}`}
                      className="relative flex items-center justify-center"
                      style={{ width: "110px", height: "200px" }}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={transformImageUrl(
                          ownedKey.image.withoutBox,
                          130,
                          200
                        )}
                        alt={ownedKey.name}
                        loading="lazy"
                      />
                    </Link>
                  )
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default MyKeys;
