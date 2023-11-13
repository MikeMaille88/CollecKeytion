import { useState } from "react";

export default function CreateKey() {
  const [keyData, setKeyData] = useState({
    name: "",
    price: 0,
    limited: 0,
    land: "",
    image: null, // Pour stocker l'image sélectionnée
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setKeyData((prevData) => ({
      ...prevData,
      image: imageFile,
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
    formData.append("image", keyData.image);

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
        image: null,
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Create a Key</h2>
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
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
