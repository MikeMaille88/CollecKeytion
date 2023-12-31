import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GoBackButton from "../components/goBackButton";
import KeyCarousel from "../components/carousel";
//import { useAuth } from "../components/authContext";

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
        const response = await fetch(`http://localhost:3005/keys/${keyId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setKeyData(data);

        // Vérifier si la relation existe déjà dans userkeys
        const userKeyResponse = await fetch(
          `http://localhost:3005/userkeys?userId=${userId}&keyId=${keyId}`
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
        `http://localhost:3005/userkeys?userId=${userId}&keyId=${keyId}`
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
          "http://localhost:3005/userkeys",
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
          `http://localhost:3005/userkeys/${userKeyId}`,
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
      <div className="bg-slate-700 min-h-screen flex items-center justify-center">
        <div className="mx-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 px-4  sm:px-6  lg:max-w-7xl lg:grid-cols-2 lg:px-8 mt-n-8">
          <div>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-10  sm:gap-y-16 lg:gap-x-8">
              <div key={keyData.name}>
                <dt className="font-medium text-gray-300 text-center">
                  {keyData.name} Key
                </dt>
                <dd className="mt-2 text-sm text-gray-200">
                  <KeyCarousel images={keyData.image} />
                </dd>
              </div>
            </dl>
          </div>
          <div className="h-96 grid grid-cols-1 grid-rows-4 gap-4 sm:gap-6 lg:gap-8  text-gray-200">
            <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
              {keyData.name}
            </h2>
            <p className="text-gray-200 mt-4">
              Description de la clé. <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mt-20">Retail Price : €{keyData.price}</p>
            <p className="mt-10">Limited Edition : {keyData.limited} ex.</p>
            <p className="mt-0">Land : {keyData.land}</p>
            <p className="mt-5">
              Have it{" "}
              <input
                id="possessCheckbox"
                aria-describedby="possessCheckbox"
                type="checkbox"
                checked={possess}
                onChange={() => handleCheckboxChange("possess")}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required=""
              />{" "}
              In double{" "}
              <input
                id="possessDoubleCheckbox"
                aria-describedby="possessDoubleCheckbox"
                type="checkbox"
                checked={possessDouble}
                onChange={() => handleCheckboxChange("possessDouble")}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required=""
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeyPage;
