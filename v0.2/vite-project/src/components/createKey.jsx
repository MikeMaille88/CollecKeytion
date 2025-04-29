// File: src/components/createKey.jsx
import { useState } from "react";

const apiUrl = import.meta.env.VITE_COLLECKEYTION_BACKEND_URL;

export default function CreateKey() {
  const [keyData, setKeyData] = useState({
    name: "",
    price: "",
    limited: "",
    land: "",
    releaseDate: "",
    banner: null,
    description: "",
    boxFront: null,
    boxBack: null,
    inBox: null,
    withoutBox: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e, imageKey) => {
    const imageFile = e.target.files[0];
    setKeyData((prevData) => ({
      ...prevData,
      [imageKey]: imageFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(keyData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    try {
      const response = await fetch(`${apiUrl}keys`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Success:", result);
      setKeyData({
        name: "",
        price: "",
        limited: "",
        land: "",
        releaseDate: "",
        banner: null,
        description: "",
        boxFront: null,
        boxBack: null,
        inBox: null,
        withoutBox: null,
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-center mb-4">Créer une clef</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          { label: "Nom", name: "name", type: "text" },
          { label: "Prix", name: "price", type: "number" },
          { label: "Limité", name: "limited", type: "number" },
          { label: "Land", name: "land", type: "text" },
          { label: "Date de sortie", name: "releaseDate", type: "date" },
          { label: "Description", name: "description", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-300 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={keyData[name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
            />
          </div>
        ))}
        
        {["banner", "boxFront", "boxBack", "inBox", "withoutBox"].map((imageKey) => (
          <div key={imageKey} className="col-span-2">
            <label className="block text-gray-300 font-medium">
              {imageKey.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, imageKey)}
                className="hidden"
                id={imageKey}
              />
              <label
                htmlFor={imageKey}
                className="w-1/3 text-center bg-primary-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-primary-700 transition"
              >
                Choisir un fichier
              </label>

              {/* Affichage du nom du fichier sélectionné */}
              {keyData[imageKey] && (
                <span className="text-gray-400 text-sm truncate max-w-xs">
                  {keyData[imageKey].name}
                </span>
              )}
            </div>
          </div>
        ))}


        <button
          type="submit"
          className="col-span-2 w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 transition"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
}

