import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyKeys = () => {
  const userId = localStorage.getItem("authId");
  const [userKeysData, setUserKeysData] = useState([]);
  const [keysData, setKeysData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Vérifier les relations existantes par user dans userkeys
        const relationUserKeyResponse = await fetch(
          `http://localhost:3005/userkeys?userId=${userId}&possess=true`
        );

        if (relationUserKeyResponse.ok) {
          const relationUserKeyData = await relationUserKeyResponse.json();
          setUserKeysData(relationUserKeyData);

          // Charger les données de la clé
          try {
            const response = await fetch(`http://localhost:3005/keys`);
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-10 bg-slate-700">
      {userKeysData.map((relationData) => {
        const correspondingKey = keysData.find(
          (key) => key._id === relationData.keyId
        );

        if (correspondingKey) {
          return (
            <Link
              key={correspondingKey._id}
              to={`/keys/${correspondingKey._id}`}
            >
              <div className="relative p-4 border-4 border-amber-900 bg-amber-950">
                <img
                  className="w-full h-full object-cover"
                  src={`/src/images/${correspondingKey.image}`}
                  alt={correspondingKey.name}
                />
              </div>
            </Link>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MyKeys;
