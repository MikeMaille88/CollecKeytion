import { useState } from "react";

export default function CreateKey() {
  const [keyData, setKeyData] = useState({
    name: "",
    price: 0,
    limited: 0,
    land: "",
    boxFront: null,
    boxBack: null,
    inBox: null,
    withoutBox: null,
    description: "",
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

    // Define formData here
    const formData = new FormData();
    formData.append("name", keyData.name);
    formData.append("price", keyData.price);
    formData.append("limited", keyData.limited);
    formData.append("land", keyData.land);
    formData.append("images", keyData.boxFront);
    formData.append("images", keyData.boxBack);
    formData.append("images", keyData.inBox);
    formData.append("images", keyData.withoutBox);
    formData.append("description", keyData.description);

    try {
      const response = await fetch("http://localhost:3005/keys", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      // Réinitialiser le formulaire après l'envoi
      setKeyData({
        name: "",
        price: 0,
        limited: 0,
        land: "",
        boxFront: null,
        boxBack: null,
        inBox: null,
        withoutBox: null,
        description: "",
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="p-4">
      <h1>Create a Key</h1>
      <div className="mt-2">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={keyData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={keyData.price}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Limited:
            <input
              type="number"
              name="limited"
              value={keyData.limited}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Land:
            <input
              type="text"
              name="land"
              value={keyData.land}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={keyData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Box Front:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "boxFront")}
            />
          </label>
          <br />

          <label>
            Box Back:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "boxBack")}
            />
          </label>
          <br />

          <label>
            In Box:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "inBox")}
            />
          </label>
          <br />

          <label>
            Without Box:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "withoutBox")}
            />
          </label>
          <br />

          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
