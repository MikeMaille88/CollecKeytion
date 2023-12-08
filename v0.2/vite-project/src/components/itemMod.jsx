//itemMod.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemMod = ({ type }) => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [modifiedData, setModifiedData] = useState({
    username: "",
    email: "",
    avatar: "",
    name: "",
    price: "",
    limited: "",
    land: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/${type === "user" ? "users" : "keys"}/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setItemData(data);
          // Mettre à jour les données modifiées pour correspondre aux données actuelles
          setModifiedData({
            username: data.username || "",
            email: data.email || "",
            avatar: data.avatar || "",
            name: data.name || "",
            price: data.price || "",
            limited: data.limited || "",
            land: data.land || "",
            image: data.image || "",
          });
        } else {
          console.error(
            `Error fetching ${type} with ID ${id}:`,
            response.statusText
          );
        }
      } catch (error) {
        console.error(`Error fetching ${type} with ID ${id}:`, error.message);
      }
    };

    fetchData();
  }, [id, type]);

  const handleFieldChange = (field, value) => {
    // Mettre à jour l'état local des données modifiées
    setModifiedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileChangeForSpecificImage = async (e, specificImage) => {
    const file = e.target.files[0];

    // Convertir l'objet File en une URL (base64) pour stockage dans l'état local
    const reader = new FileReader();
    reader.onloadend = () => {
      setModifiedData((prevData) => ({
        ...prevData,
        [specificImage]: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleModify = async () => {
    try {
      const modifiedFields = { ...modifiedData };

      // Supprimer le champ "file" avant d'envoyer les données au serveur
      delete modifiedFields.file;

      // Ajoutez seulement les champs modifiés à modifiedFields
      for (const field in modifiedData) {
        if (
          modifiedData[field] !== itemData[field] &&
          modifiedData[field] !== ""
        ) {
          modifiedFields[field] = modifiedData[field];
        }
      }

      // Envoyer les modifications vers le serveur uniquement si des champs ont été modifiés
      if (Object.keys(modifiedFields).length > 0) {
        const response = await fetch(
          `http://localhost:3005/${type === "user" ? "users" : "keys"}/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(modifiedFields),
          }
        );

        if (response.ok) {
          console.log(`${type} modifié avec succès !`);
        } else {
          console.error(
            `Erreur lors de la modification de ${type} avec l'ID ${id}:`,
            response.statusText
          );
        }
      } else {
        console.log("Aucune modification détectée.");
      }
    } catch (error) {
      console.error(
        `Erreur lors de la modification de ${type} avec l'ID ${id}:`,
        error.message
      );
    }
  };

  if (!itemData) {
    // Les données ne sont pas encore chargées, vous pouvez rendre un indicateur de chargement ou autre chose
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-auto justify-between ml-10 mr-10">
      <div className="max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href={`/edit-${type}/${id}`}>
          <div className="flex items-center justify-center mt-6">
            {type === "user" ? (
              <img
                className="rounded-lg"
                src={`/src/images/${modifiedData.avatar}`}
                alt={modifiedData.username}
              />
            ) : (
              <img
                className="rounded-lg h-96 w-auto"
                src={`/src/images/${modifiedData.image.inBox}`}
                alt={modifiedData.name}
              />
            )}
          </div>
        </a>
        <div className="p-5">
          {type === "user" && (
            <>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-400 h-[90px]">
                <input
                  type="text"
                  value={modifiedData.username}
                  onChange={(e) =>
                    handleFieldChange("username", e.target.value)
                  }
                />
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Email:
                <input
                  type="text"
                  value={modifiedData.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                />
              </p>
            </>
          )}
          {type === "key" && (
            <>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-400 h-[90px]">
                <input
                  type="text"
                  value={modifiedData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                />
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Price: €
                <input
                  type="text"
                  value={modifiedData.price}
                  onChange={(e) => handleFieldChange("price", e.target.value)}
                />
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Limited:
                <input
                  type="text"
                  value={modifiedData.limited}
                  onChange={(e) => handleFieldChange("limited", e.target.value)}
                />
                pieces
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Land:
                <input
                  type="text"
                  value={modifiedData.land}
                  onChange={(e) => handleFieldChange("land", e.target.value)}
                />
              </p>
            </>
          )}
          <button
            onClick={handleModify}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Modify {type.charAt(0).toUpperCase() + type.slice(1)}
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Ajouter 4 espaces avec des images spécifiques et un endroit pour changer chaque image */}
      {type === "key" && (
        <div className="grid grid-cols-2 max-w-2xl">
          <div className="max-w-sm m-2 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="rounded-lg h-80 w-auto mx-auto m-4"
              src={`/src/images/${modifiedData.image.boxFront}`}
              alt="Front"
            />
            <div className="p-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChangeForSpecificImage(e, "front")}
              />
            </div>
          </div>

          <div className="max-w-sm m-2 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="rounded-lg h-80 w-auto mx-auto m-4"
              src={`/src/images/${modifiedData.image.boxBack}`}
              alt="Back"
            />
            <div className="p-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChangeForSpecificImage(e, "back")}
              />
            </div>
          </div>

          <div className="max-w-sm m-2 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="rounded-lg h-80 w-auto mx-auto m-4"
              src={`/src/images/${modifiedData.image.inBox}`}
              alt="In Box"
            />
            <div className="p-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChangeForSpecificImage(e, "inBox")}
              />
            </div>
          </div>

          <div className="max-w-sm m-2 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="rounded-lg h-80 w-auto mx-auto m-4"
              src={`/src/images/${modifiedData.image.withoutBox}`}
              alt="Without Box"
            />
            <div className="p-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChangeForSpecificImage(e, "withoutBox")
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemMod;
